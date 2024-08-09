import RoutesModel from "../models/RoutesModel";
import UserModel from "../models/UserModel";

export default class UserPage extends RoutesModel {
  constructor(client: any) {
    super(client, {
        path: "/",
        name: "LandingPage",
        description: "Página Principal"
    });
  }
    public run(): void {
        const user = new UserModel({
            id: 0,
            isAdmin: false,
            name: "User Page",
            password: "password",
            email: "user@example.com",
        });

        console.log(user.Password, user)
    }
}
