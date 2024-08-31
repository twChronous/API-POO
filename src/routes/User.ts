import { Request, Response } from 'express'

import RoutesModel from "../models/RoutesModel";
import { ClientInterface, UserOptions } from "../utils/types";

export default class UserPage extends RoutesModel {
    
    constructor(client: ClientInterface) {
        super(client, {
            path: "/users",
            name: "usersPage",
            description: "Mostra todos os usuarios"
        });
    }
    public run():void {

        this.client.app.get(this.path, (req: Request, res: Response) => {
            this.ShowAll(req, res);
        });
        this.client.app.post(this.path, (req: Request, res: Response) => {
            this.CreateUser(req, res);
        });
        this.client.app.delete(this.path, (req: Request, res: Response) => {
            this.removeUser(req, res);
        });
        this.client.app.get(`${this.path}/:id`, (req: Request, res: Response) => {
            this.getById(req, res);
        });
        this.client.app.put(this.path, (req: Request, res: Response) => {
            this.UpdateUser(req, res);
        });
    }
    private async ShowAll(req: Request, res: Response): Promise<void> {
        let data = await this.client.users.findAll();
        res.status(data.length > 0 ? 200 : 204).send(data);
    }
    private async CreateUser(req: Request, res: Response): Promise<void | any> {
        if (req.body.password.length < 6) return res.status(400).json({error: 'Password is less than 6 digits'}) 
            if (await this.client.users.findOne({ email: req.body.email })) {
                return res.status(400).json({ message: 'email already exists' })
        }

        await this.client.users.add(req.body)
            .then((user: UserOptions) => res.status(201).send(user))
            .catch((err: any) => res.status(400).json({ error: err.message }))
    }
    private async removeUser(req: Request, res: Response) {
        try {
            const user = await this.client.users.findOne({ _id: req.body.id });

            if (!user) return res.status(404).json({ error: 'User not found' });
            
            // if (user!._id !== req.body.id && !user!.isAdmin) {
            //     return res.status(403).json({ error: 'Permission denied' });
            // }
    
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
    private async getById(req: Request, res: Response): Promise<void | any> {
        await this.client.users.findOne({ _id: req.params.id })
            .then((user) => res.status(200).send(user))
            .catch((err: any) => res.status(404).json({ error: err.message }))
    }
    private async UpdateUser(req: Request, res: Response): Promise<void | any> {
        if (req.body.password && req.body.password.length < 6) return res.status(400).json({error: 'Password is less than 6 digits'}) 

        await this.client.users.update({ _id: req.body.id! }, req.body)
            .catch((err: any) => res.status(400).json({ error: err.message }))
        await this.client.users.findOne({ _id: req.body.id! })
            .then((user) => res.status(200).send(user))
            .catch((err: any) => res.status(400).json({ error: err.message }))
    }
}

