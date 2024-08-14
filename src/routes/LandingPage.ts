import { Request, Response } from 'express'

import RoutesModel from "../models/RoutesModel";
import { ClientInterface } from "../utils/types";

export default class LandingPage extends RoutesModel {
  constructor(client: ClientInterface) {
    super(client, {
        path: "/",
        name: "LandingPage",
        description: "Página Principal"
    });
  }

    public run(): void {
        this.client.app.get(this.path, (req: Request, res: Response) => {
            const data = { message: 'Hello World!' };
            res.status(200).send(data);
        });
    }
}
