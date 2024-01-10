import * as schema from '../../domain/schema';
import { Repository } from '../../domain/interface';
import { AlreadyExistUserError } from './errors/AlreadyExistUserError';

export class User {

  constructor(
) { };

  public async getAllUserInformation(): Promise<schema.IStoredUser[]> {
    const res = await Repository.instance
      .getAllUsers();
    return res;
  }

  public async storeUserInformation(user: schema.IUserData): Promise<schema.IStoredUser | null> {
    const exist = await User.checkUserByEmailExist(user.email);
    if (exist) {
      throw new AlreadyExistUserError(user.email,`Email has already existed.`);
    }
    const userId = await Repository.instance
      .storeUserData(user);
    if(userId != null){
      return await Repository.instance.getUserById(userId);
    }
    return null;
  }

  static async checkUserByEmailExist(email: string): Promise<boolean> {
    try {
      const user = await User.byEmail(email);
      return !(user && !user.email);
    } catch (e) {
      return false;
    }
  }

  static byEmail(email: string): Promise<schema.IStoredUser> {
    return Repository.instance
      .getUserByEmail(email)
      .then(user => user);
  }
}
