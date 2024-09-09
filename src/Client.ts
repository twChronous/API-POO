import express, { Application } from 'express';
import cors from 'cors';

import Loaders from './loaders/index';
import { Users, Todos } from './database/models';

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, 
  };
  
interface ClientInterface {
    users: typeof Users;
    todos: typeof Todos;
    app: Application;
    LOG(...args: string[]): void;
    LOG_ERR(...args: string[]): void;
    Error(...args: string[]): void;
}

export default class Client implements ClientInterface {
    public app: Application;
    users: typeof Users;
    todos: typeof Todos;

    constructor() {
        this.users = Users;
        this.todos = Todos;
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors(corsOptions));
    }

    public startServer(port: number): void {
        this.app.listen(port, () => {
            this.LOG(`http://localhost:${port}/`, 'App is running')
        });
        this.initializeLoaders();
    }

    public async initializeLoaders(): Promise<void> {
        const loaders: Array<typeof Loaders[keyof typeof Loaders]> = Object.values(Loaders);
        let loadedCount = 0;
        for (const LoaderClass of loaders) {
            const loaderInstance = new LoaderClass(this); 
            try {
                await loaderInstance.load();
                loadedCount++;
            } catch (e) {
                this.LOG_ERR(e instanceof Error ? e.message : String(e), loaderInstance.name);
            }
        }

        this.LOG(`Successfully loaded ${loadedCount} modules out of ${loaders.length}`, 'LOADERS');
    }

    public LOG(...args: string[]): void {
        const Sendlog = (args.length > 1 ? `\x1b[32m${args.map(t => `[${t}]`).slice(1).join(' ')}\x1b[0m` : '') + ` \x1b[34m${args[0]}\x1b[0m`;
        console.log(Sendlog);
    }

    public LOG_ERR(...args: string[]): void {
        const error = args[0];
        const Sendlog = (args.length > 1 ? args.slice(1).map(t => `\x1b[33m[${t}]\x1b[0m`) : '');
        console.error('\x1b[31m[ERROR]\x1b[0m', ...Sendlog, error);
    }

    public Error(err: any): void {
        throw new Error(err.message ? err.message : String(err));
    }
}
