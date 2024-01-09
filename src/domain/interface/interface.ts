import * as schema from '../schema';

export interface RepositoryInterface {

  // get user information by email
  getAllUsers(): Promise<schema.IStoredUser[]>;

  // get user information by email
  getUserById(id: string): Promise<schema.IStoredUser>;

  // store the user information
  upsertUserData(payload: schema.IUserData): Promise<boolean>;
}
