import mongoose, { Mongoose, Document } from 'mongoose';
import MongoRepository from '../MongoRepository';
import UserSchema from '../schemas/UserSchema';
import {UserOptions } from '../../../utils/types'

interface IUserDocument extends Document {
    _id: string;
    money: number;
    isAdmin: boolean;
    name: string;
    password: string;
    email: string;
}


export default class UserRepository extends MongoRepository<IUserDocument> {
    constructor(mongooseInstance: Mongoose) {
        super(mongooseInstance, mongooseInstance.model<IUserDocument>('User', UserSchema));
    }

    parse(entity: IUserDocument): UserOptions {
        return {
            _id: entity._id,
            name: entity.name,
            email: entity.email,
            isAdmin: entity.isAdmin,
            password: entity.password,
            money: 0.00,
            ...(super.parse(entity) || {})
        };
    }
}
