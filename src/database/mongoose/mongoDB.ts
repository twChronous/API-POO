import mongoose, { Mongoose } from 'mongoose';
import DBWrapper from '../DBWrapper';
import { UserRepository } from './repositories';

// Tipo das opções passadas para o construtor, ajustado conforme necessário
interface MongoDBOptions {
    // Adicione aqui as opções específicas se houver alguma
}

export default class MongoDB extends DBWrapper {
    private mongoose: Mongoose;
    public users: UserRepository | undefined;

    constructor(options: MongoDBOptions = {}) {
        super(options);
        this.mongoose = mongoose;
    }

    async connect(): Promise<void> {
        await mongoose.connect(process.env.MONGODB_URI!); // Opções removidas
        this.users = new UserRepository(this.mongoose);
    }
}
