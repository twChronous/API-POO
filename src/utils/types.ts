export interface RoutesModelOptions {
    path: string,
    name: string,
    description : string,
}
export interface UserOptions {
    id: number,
    name: string,
    email: string,
    password: string,
    isAdmin: boolean,
}