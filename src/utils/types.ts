import { Application } from 'express';

import { Document } from '../database/Schema'
import { Users, Todos } from '../database/models';

export interface BaseSchema {
    _id: string;
    createdAt: string;
    updatedAt: string;
  }
export interface RoutesModelOptions {
    path: string;
    name: string;
    description : string;
}
export interface UserOptions {
    _id?: string;
    name: string;
    email: string;
    money: number;
    password: string;
    isAdmin: boolean;
    verified: boolean;
}
export interface TodoOptions {
    _id?: string;
    name: string;
    description: string;
    isDone: boolean;
}
export interface IUserDocument extends Document {
    _id: string;
    money: number;
    isAdmin: boolean;
    name: string;
    password: string;
    email: string;
}

export interface ClientInterface {
    users: typeof Users;
    todos: typeof Todos;
    app: Application;
    LOG(...args: string[]): void;
    LOG_ERR(...args: string[]): void;
    Error(...args: string[]): void;
}
