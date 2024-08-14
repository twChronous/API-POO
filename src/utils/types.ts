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
    parse: (entity: any) => any; // Ajuste o tipo de parâmetro e retorno conforme necessário
    add: (entity: any) => Promise<any>; // Ajuste o tipo de parâmetro e retorno conforme necessário
    findOne: (entity: any) => Promise<any>; // Ajuste o tipo de parâmetro e retorno conforme necessário
    size: () => Promise<number>; // Método para retornar o tamanho
    get: (id: string, projection?: any) => Promise<any>; // Ajuste o tipo de parâmetro e retorno conforme necessário
    remove: (id: string) => Promise<any>; // Ajuste o tipo de parâmetro e retorno conforme necessário
    update: (filter: FilterQuery<IUserDocument>, doc?: UpdateQuery<IUserDocument>, options?: any) => Promise<any>; 
    upsert: (id: string) => Promise<any>; // Ajuste o tipo de parâmetro e retorno conforme necessário
    verificar: (id: string) => Promise<boolean>; // Método assíncrono que retorna um booleano
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
