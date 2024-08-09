import { UserOptions } from "../utils/types";

export default class UserModel {
    public name: string;
    public id: number;
    private email: string;
    private isAdmin: boolean;
    private password: string;
    constructor(options: UserOptions) {
        this.id = options.id
        this.name = options.name
        this.email = options.email 
        this.password = options.password
        this.isAdmin = options.isAdmin || false
    }
    
    public get Email(): string {
        return this.email;
    }
    public get IsAdmin(): boolean {
        return this.isAdmin;
    }
    public get Password(): string {
        return this.password;
    }
    public setPassword(password: string) {
        this.password = password;
    }
    public comparePassword(password: string): boolean {
        return this.password === password;
    }
    public setIsAdmin(isAdmin: boolean) {
        this.isAdmin = isAdmin;
    }
    public setEmail(email: string) {
        this.email = email;
    }
}
  