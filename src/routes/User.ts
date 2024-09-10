import { Request, Response } from 'express'
import bcrypt from 'bcrypt';

import RoutesModel from "../models/RoutesModel";
import { ClientInterface } from "../utils/types";
import { authenticateToken } from '../middlewares/authToken';

export default class UserPage extends RoutesModel {
    
    constructor(client: ClientInterface) {
        super(client, {
            path: "/users",
            name: "usersPage",
            description: "Mostra todos os usuarios"
        });
    }
    public run():void {
        this.client.app.get(this.path, authenticateToken, this.ShowAll.bind(this));
        this.client.app.delete(this.path, authenticateToken, this.removeUser.bind(this));
        this.client.app.get(`${this.path}/token`, authenticateToken, this.getByToken.bind(this));
        this.client.app.put(this.path, authenticateToken, this.UpdateUser.bind(this));
    }
    private async ShowAll(req: Request, res: Response): Promise<void | any> {
        if (!req.body.auth.isAdmin) {
            return await this.client.users.findOne({ _id: req.body.auth.id })
                    .then((user) => res.status(200).send(user))
                    .catch((err: any) => res.status(404).json({ error: err.message }))
        }
        let data = await this.client.users.findAll();
        res.status(data.length > 0 ? 200 : 204).send(data);
    }
    private async removeUser(req: Request, res: Response) {
        if (!req.body.auth.isAdmin && req.body.auth.id !== req.body.id) {
            return res.sendStatus(403); // Forbidden
        }
        try {
            const user = await this.client.users.findOne({ _id: req.body.id });

            if (!user) return res.status(404).json({ error: 'User not found' });
            
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

            if (!isPasswordValid && !req.body.auth.isAdmin) {
                console.log('Invalid password');
                return res.status(400).json({ error: 'Invalid password' });
            }
            // Remove todos os todos associados ao usuário, um por um
            for (const todoId of user!.todos) {
                await this.client.todos.remove((todoId._id)!.toString());
            }
    
            // Remove o usuário
            await this.client.users.remove(req.body.id);
    
            // Retorna o ID do usuário removido com status 200
            res.status(200).send({ removedUserId: req.body.id });
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }    
    private async getByToken(req: Request, res: Response): Promise<void | any> {
        await this.client.users.findOne({ _id: req.body.auth.id })
            .then((user) => res.status(200).send(user))
            .catch((err: any) => res.status(404).json({ error: err.message }))
    }
    private async UpdateUser(req: Request, res: Response): Promise<void | any> {
        if (!req.body.auth.isAdmin && req.body.auth.id !== req.body.id) {
            return res.sendStatus(403); // Forbidden
        }
        if (req.body.password && req.body.password.length < 6) return res.status(400).json({error: 'Password is less than 6 digits'}) 
        const hash = await bcrypt.hash(req.body.password, 10)
        if (req.body.password.substring(0, 7) !== '$2b$10$') req.body.password = hash
        await this.client.users.update({ _id: req.body.id! }, req.body)
            .catch((err: any) => res.status(400).json({ error: err.message }))
        await this.client.users.findOne({ _id: req.body.id! })
            .then((user) => res.status(200).send(user))
            .catch((err: any) => res.status(400).json({ error: err.message }))
    }
}

