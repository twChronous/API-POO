import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import { Request, Response } from 'express';

import RoutesModel from "../models/RoutesModel";
import { ClientInterface } from "../utils/types";

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
    this.client.app.post(`${this.path}/create-user`, this.CreateUser.bind(this));
    this.client.app.get(`${this.path}/verify-email`, this.verifyEmail.bind(this));
  }

  private async loginUser(req: Request, res: Response): Promise<void | any> {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await this.client.users.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log('Invalid password');
            return res.status(400).json({ error: 'Invalid password' });
        }

        // Generate JWT token after all validations
        const token = JWT.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET!, {
            expiresIn: process.env.JWT_EXPIRATION!, // 24 hours
        });

        // Check if the user's account is verified
        if (!user.verified) {
            console.log('Account not verified');
            return res.status(403).json({
                email,
                token,
                error: 'Your account has not been verified',
            });
        }

        console.log('Login successful, sending token');
        return res.json({ email, token });

    } catch (error) {
        console.error('Error during login:', error); // Debugging log
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

  private async verifyEmail(req: Request, res: Response): Promise<void | any> {
    const { token } = req.query;

    if (!token) return res.status(400).json({ error: 'Missing confirm token' });

    JWT.verify(token as string, process.env.JWT_SECRET!, async (err: any, decoded: any) => {
      if (err) return res.status(401).json({ error: 'Invalid confirm token' });

      await this.client.users.update(
        { email: decoded },
        { verified: true },
      );

      res.status(200).json({ message: 'User verified' });
    });
  }
  private async CreateUser(req: Request, res: Response): Promise<void | any> {
        if (req.body.password.length < 6) return res.status(400).json({error: 'Password is less than 6 digits'}) 
            if (await this.client.users.findOne({ email: req.body.email })) {
                return res.status(400).json({ message: 'email already exists' })
        }
        const user = await this.client.users.add(req.body)
        if (!user) {
            console.log('Error while creating user');
            return res.status(400).json({ error: 'Error while creating user' });
        }
        const token = JWT.sign({ id: user._id,isAdmin: user.isAdmin }, process.env.JWT_SECRET!, {
            expiresIn: process.env.JWT_EXPIRATION!, // 24 hours
        });
     
        return res.json({ email: user.email, token });
    }
}
