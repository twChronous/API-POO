import RoutesModel from "../models/RoutesModel";

export default class LandingPage extends RoutesModel {
  constructor(client: any) {
    super(client, {
        path: "/",
        name: "LandingPage",
        description: "Página Principal"
    });
  }

    public run(): void {
        this.client.get(this.path, (req, res) => {
            res.status(200).send('OK');
        });
    }
}
