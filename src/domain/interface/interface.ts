import * as schema from '../schema';

export interface RepositoryInterface {
  // get user information by email
  getUserByEmail(email: string): Promise<schema.IStoredUser>;

  // store the user information
  upsertUserData(payload: schema.IUserData): Promise<boolean>;
}
