import { RoutesModelOptions } from "../utils/types";

export default class RoutesModel {
    client: any;
    path: string;
    name: string;
    description: string;

    constructor(client:any, options: RoutesModelOptions) {
        this.client = client
        this.path = options.path || "/",
        this.name = options.name || "Sem Nome"
        this.description = options.description || "Nenhuma"
    }
  
    public run(): void {
    }
}
  