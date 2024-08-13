import { Application } from 'express';

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
export interface DatabaseOptions extends MongoDB {
    users: UserRepository;
    parse: (entity: any) => any; // Ajuste o tipo de parâmetro e retorno conforme necessário
    add: (entity: any) => Promise<any>; // Ajuste o tipo de parâmetro e retorno conforme necessário
    findOne: (id: string, projection?: any) => Promise<any>; // Ajuste o tipo de parâmetro e retorno conforme necessário
    size: () => Promise<number>; // Método para retornar o tamanho
    get: (id: string, projection?: any) => Promise<any>; // Ajuste o tipo de parâmetro e retorno conforme necessário
    remove: (id: string) => Promise<any>; // Ajuste o tipo de parâmetro e retorno conforme necessário
    update: (id: string, entity: any, options?: any) => Promise<any>; // Ajuste o tipo de parâmetro e retorno conforme necessário
    upsert: (id: string) => Promise<any>; // Ajuste o tipo de parâmetro e retorno conforme necessário
    verificar: (id: string) => Promise<boolean>; // Método assíncrono que retorna um booleano
    findAll: (projection?: any) => Promise<any[]>; // Ajuste o tipo de parâmetro e retorno conforme necessário
}

export interface ClientInterface {
    database: DatabaseOptions | false;
    DatabaseUtils?: DatabaseUtils;
    app: Application;
    LOG(...args: string[]): void;
    LOG_ERR(...args: string[]): void;
    Error(...args: string[]): void;
    user?: UserOptions; 
}
