import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';

async function verifyJWT(req: Request, res: Response, next: NextFunction): Promise<void | any> {
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