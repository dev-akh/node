import { User } from "../controller/User";
import * as schema from "../../domain/schema";

export class GetUserInformationUsecase {

  async getAllUsers(): Promise<{ users: schema.IStoredUser[]; }> {
    const user = new User();
    const users = await user.getAllUserInformation();
    return { users };
  }
}
