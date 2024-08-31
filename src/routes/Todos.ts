import { Request, Response } from 'express'

import RoutesModel from "../models/RoutesModel";
import { ClientInterface, TodoOptions } from "../utils/types";

export default class TodoPage extends RoutesModel {
    
    constructor(client: ClientInterface) {
        super(client, {
            path: "/todos",
            name: "todosPage",
            description: "Mostra todos os a fazeres"
        });
    }
    public run():void {
        this.client.app.get(this.path, (req: Request, res: Response) => {
            this.ShowAll(req, res);
        });
        this.client.app.post(this.path, (req: Request, res: Response) => {
            this.CreateTodo(req, res);
        });
        this.client.app.delete(this.path, (req: Request, res: Response) => {
            this.removeTodo(req, res);
        });
        this.client.app.get(`${this.path}/:id`, (req: Request, res: Response) => {
            this.getById(req, res);
        });
        this.client.app.put(this.path, (req: Request, res: Response) => {
            this.UpdateTodo(req, res);
        });
    }
    private async ShowAll(req: Request, res: Response): Promise<void> {
        let data = await this.client.todos.findAll();
        res.status(data.length > 0 ? 200 : 204).send(data);
    }
    private async CreateTodo(req: Request, res: Response): Promise<void | any> {
        // TODO: Add ownerID here or in the reverse in the User, to make only the owner of this todo see it or edit it
        await this.client.todos.add(req.body)
            .then((todo: TodoOptions) => res.status(201).send(todo))
            .catch((err: any) => res.status(400).json({ error: err.message }))
    }
    private async removeTodo(req: Request, res: Response): Promise<void | any> {
        const todo = await this.client.todos.findOne({ _id: req.body.id })
        if(!todo) return res.status(404).json({error: 'todo not found'})
        if(todo._id != req.body.id) return res.status(403).json({error: 'Permission denied'})
        await this.client.todos.remove(req.body.id)
            .then((todo: TodoOptions) => res.status(200).send(todo._id))
            .catch((err: any) => res.status(400).json({ error: err.message }))
    }
    private async getById(req: Request, res: Response): Promise<void | any> {
        await this.client.todos.findOne({ _id: req.params.id })
            .then((todo) => res.status(200).send(todo))
            .catch((err: any) => res.status(404).json({ error: err.message }))
    }
    private async UpdateTodo(req: Request, res: Response): Promise<void | any> {
        if (req.body.password && req.body.password.length < 6) return res.status(400).json({error: 'Password is less than 6 digits'}) 
        req.body.money = parseFloat(req.body.money);

        await this.client.todos.update({ _id: req.body.id! }, req.body)
            .catch((err: any) => res.status(400).json({ error: err.message }))
        await this.client.todos.findOne({ _id: req.body.id! })
            .then((todo) => res.status(200).send(todo))
            .catch((err: any) => res.status(400).json({ error: err.message }))
    }
}

