import bcrypt from 'bcrypt';
import JWT, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import RoutesModel from "../models/RoutesModel";
import { ClientInterface } from "../utils/types";

interface IPayload extends JwtPayload {
  id: string;
}

export default class AuthRoutes extends RoutesModel {
  constructor(client: ClientInterface) {
    super(client, {
      path: "/auth",
      name: "AuthRoutes",
      description: "Rotas de Autenticação"
    });
  }

  public run(): void {
    this.client.app.post(`${this.path}/login`, this.loginUser.bind(this));
    this.client.app.get(`${this.path}/verify-email`, this.verifyEmail.bind(this));
    this.client.app.use(this.verifyJWT.bind(this)); // Middleware para verificar o JWT em rotas subsequentes
  }

  private async loginUser(req: Request, res: Response): Promise<void | any> {
    const { email, password } = req.body;

    const user = await this.client.users.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ error: 'Invalid password' });

    if (!user.verified) {
      return res.status(401).json({
        error: 'Your account has not been verified',
      });
    }

    const token = JWT.sign({ id: user._id }, process.env.SECRET!, {
      expiresIn: 86400,
    });

    return res.send({ email, token });
  }

  private async verifyJWT(req: Request, res: Response, next: NextFunction): Promise<void | any> {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ error: 'No token provided' });

    JWT.verify(token as string, process.env.SECRET!, async (err: any, decoded: any) => {
      if (err)
        return res.status(401).send({ error: 'Token provided is invalid' });

      const user = await this.client.users.findOne({ _id: decoded.id });
      req.body = user;

      return next();
    });
  }

  private async verifyEmail(req: Request, res: Response): Promise<void | any> {
    const { token } = req.query;

    if (!token) return res.status(400).json({ error: 'Missing confirm token' });

    JWT.verify(token as string, process.env.SECRET!, async (err: any, decoded: any) => {
      if (err) return res.status(401).json({ error: 'Invalid confirm token' });

      await this.client.users.update(
        { email: decoded },
        { verified: true },
      );

      res.status(200).json({ message: 'User verified' });
    });
  }
}
