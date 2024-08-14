import mongoose, { Mongoose } from 'mongoose';
import MongoRepository from '../MongoRepository';
import UserSchema from '../schemas/UserSchema';
import {UserOptions, IUserDocument } from '../../../utils/types'


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
            ...(parse(entity) || {})
        };
    }
}
