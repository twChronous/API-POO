import { UserOptions, ClientInterface } from './types'; // Ajuste conforme os tipos reais

export default class DatabaseUtils {
    private client: any; // Ajuste o tipo conforme a definição real do cliente

    constructor(client: any) {
        this.client = client;
    }

    async setAdmin(user: UserOptions, admin: boolean): Promise<void> {
        if (!user || typeof admin !== 'boolean') throw new Error('Unidentified user or invalid owner parameter');
        await this.client.database.users.update(user._id, { $set: { 'isAdmin': admin } });
    }

}
