import * as schema from '../../domain/schema';
import { Repository } from '../../domain/interface';

export class User {
  public async getAllUserInformation(): Promise<schema.IStoredUser[]> {
    const res = await Repository.instance
      .getAllUsers();
    return res;
  }

  public async storeUserInformation(payload: schema.IUserData): Promise<boolean> {
    const res = await Repository.instance
      .upsertUserData(payload);
    return res;
  }
}
