import { Request, Response } from 'express'

import RoutesModel from "../models/RoutesModel";
import { ClientInterface } from "../utils/types";
import { authenticateToken } from '../middlewares/authToken';

export default class TodoPage extends RoutesModel {
    
    constructor(client: ClientInterface) {
        super(client, {
            path: "/todos",
            name: "todosPage",
            description: "Mostra todos os a fazeres"
        });
    }
    public run():void {
        this.client.app.get(this.path, authenticateToken, this.ShowAll.bind(this));
        this.client.app.post(this.path, authenticateToken, this.CreateTodo.bind(this));
        this.client.app.delete(this.path, authenticateToken, this.removeTodo.bind(this));
        this.client.app.get(`${this.path}/:id`, authenticateToken, this.getById.bind(this));
        this.client.app.put(this.path, authenticateToken, this.UpdateTodo.bind(this));  
    }
    private async ShowAll(req: Request, res: Response) {
        if (!req.body.auth.isAdmin) {
            console.log(req.body.auth)
            const data = await this.client.todos.findAll({ ownerID: req.body.auth.id });
            return res.status(data.length > 0 ? 200 : 204).send(data);
        }
        const data = await this.client.todos.findAll();
        res.status(data.length > 0 ? 200 : 204).send(data);
    }
    private async CreateTodo(req: Request, res: Response) {
        if (!req.body.auth.isAdmin && req.body.auth.id !== req.body.id) {
            return res.sendStatus(403); // Forbidden
        }
        try {
            const todo = await this.client.todos.add({
                ...req.body,
                ownerID: req.body.id, 
            });
    
            await this.client.users.update(
                { _id: req.body.id }, 
                { $push: { todos: todo._id } } 
            );
    
            res.status(201).send(todo);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
    private async removeTodo(req: Request, res: Response) {
        if (!req.body.auth.isAdmin && req.body.auth.id !== req.body.id) {
            return res.sendStatus(403); // Forbidden
        }
        try {
            const user = await this.client.users.findOne({ _id: req.body.ownerID });
            const todo = await this.client.todos.findOne({ _id: req.body.id });
    
            // Verify if to-do exists and if the user has the permission to remove it
            if (!todo) return res.status(404).json({ error: 'User not found' });
            if (!user?.todos.some((t) => t.toString() === req.body.id)) {
                res.status(403).json({ error: 'Permission denied' });
            }
    
            await this.client.todos.remove(req.body.id);
    
            await this.client.users.update(
                { _id: req.body.ownerID },
                { $pull: { todos: req.body.id } }
            );
            res.status(200).send({ removedTodoId: req.body.id });
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
    
    private async getById(req: Request, res: Response): Promise<void | any> {
        if (!req.body.auth.isAdmin && req.body.auth.id !== req.body.id) {
            return res.sendStatus(403); // Forbidden
        }
        await this.client.todos.findOne({ _id: req.params.id })
            .then((todo) => res.status(200).send(todo))
            .catch((err: any) => res.status(404).json({ error: err.message }))
    }
    private async UpdateTodo(req: Request, res: Response): Promise<void | any> {
        if (!req.body.auth.isAdmin && req.body.auth.id !== req.body.id) {
            return res.sendStatus(403); // Forbidden
        }
        if(!req.body.id) res.status(400).send({ error: 'id is required' })
        await this.client.todos.update({ _id: req.body.id! }, req.body)
            .catch((err: any) => res.status(400).json({ error: err.message }))
        await this.client.todos.findOne({ _id: req.body.id! })
            .then((todo) => res.status(200).send(todo))
            .catch((err: any) => res.status(400).json({ error: err.message }))
    }
}

