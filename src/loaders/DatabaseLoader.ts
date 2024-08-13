import { MongoDB } from '../database';
import { ClientInterface, DatabaseOptions } from '../utils/types';
import DatabaseUtils from '../utils/DatabaseUtils'; // Corrigido para refletir o nome do módulo

export default class DatabaseLoader {
    name: string;
    client: ClientInterface;
    database: MongoDB | false;
    DatabaseUtils: DatabaseUtils | null;

    constructor(client: ClientInterface) {
        this.name = 'DatabaseLoader';
        this.client = client;
        this.database = false;
        this.DatabaseUtils = null;
    }

    async load(): Promise<void> {
        try {
            await this.LoaderDatabase();
            (this.client.database as MongoDB) = (this.database as MongoDB);
            this.client.LOG('The database was successfully imported!', 'DATABASE');
        } catch (error: any) {
            this.client.LOG_ERR(error, this.name);
        }
    }

    async LoaderDatabase(DBWrapper: typeof MongoDB = MongoDB, options: Record<string, any> = {}): Promise<void> {
        this.database = new DBWrapper(options);
        try {
            await this.database.connect();
            await this.initializeUtils();
        } catch (error: any) {
            this.client.LOG_ERR(error, this.name);
        }
    }

    initializeUtils(): void {
        try {
            if (this.database) {
                this.DatabaseUtils = new DatabaseUtils(this.client);
                this.client.DatabaseUtils = this.DatabaseUtils;
            } else {
                throw new Error('Database is not initialized');
            }
        } catch (error: any) {
            this.client.Error(error);
        }
    }
}
