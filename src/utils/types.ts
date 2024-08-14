import { Application } from 'express';
import type {
    Document,
    FilterQuery,
    UpdateQuery,
} from 'mongoose'

import { MongoDB } from '../database';
import DatabaseUtils from '../utils/DatabaseUtils';
import { UserRepository } from '../database/mongoose/repositories';

export interface RoutesModelOptions {
    path: string,
    name: string,
    description : string,
}
export interface UserOptions {
    _id?: String,
    name: string,
    email: string,
    money: number,
    password: string,
    isAdmin: boolean,
}
export interface IUserDocument extends Document {
    _id: string;
    money: number;
    isAdmin: boolean;
    name: string;
    password: string;
    email: string;
}
export interface DatabaseOptions extends MongoDB {
    users: DatabaseUserOptions;
}
export interface DatabaseUserOptions extends UserRepository  {
    add: (entity: any) => Promise<any>; // Ajuste o tipo de parâmetro e retorno conforme necessário
    findOne: (entity: any) => Promise<any>; // Ajuste o tipo de parâmetro e retorno conforme necessário
    get: (id: string, projection?: any) => Promise<any>; // Ajuste o tipo de parâmetro e retorno conforme necessário
    remove: (id: string) => Promise<any>; // Ajuste o tipo de parâmetro e retorno conforme necessário
    update: (filter: FilterQuery<IUserDocument>, doc?: UpdateQuery<IUserDocument>, options?: any) => Promise<any>; 
    findAll: (projection?: any) => Promise<any[]>; // Ajuste o tipo de parâmetro e retorno conforme necessário
}

export interface ClientInterface {
    database: DatabaseOptions;
    DatabaseUtils?: DatabaseUtils;
    app: Application;
    LOG(...args: string[]): void;
    LOG_ERR(...args: string[]): void;
    Error(...args: string[]): void;
}
