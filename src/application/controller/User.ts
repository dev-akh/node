import * as schema from '../../domain/schema';
import { Repository } from 'src/domain/interface';

export class User {
  public async getAllUserInformation(): Promise<schema.IStoredUser[]> {
    const res = await Repository.instance
      .getAllUsers();
    return res;
  }
}
