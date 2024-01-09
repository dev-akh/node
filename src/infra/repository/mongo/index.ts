import { Collection, MongoClient, Db, ObjectId } from 'mongodb';
import * as Logger from '../../../utils/Logger';
import * as schema from '../../../domain/schema';

import {
  RepositoryInterface,
  RepositoryInternalError,
  NotFoundError,
} from '../../../domain/interface';

export interface DB {
  users: Collection<schema.IStoredUser | schema.IUserData>;
}

export class MongoRepository implements RepositoryInterface {

  private db: Db;
  private users: Collection<schema.IStoredUser | schema.IUserData >;

  constructor(client: MongoClient, dbName?: string) {
    this.db = client.db(dbName);
    this.users = this.db.collection('users');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapDoc(doc: any) {
    const result = doc ;

    if (doc._id && doc._id.toHexString) {
      result._id = doc._id.toHexString();
    }

    return result;
  }

  private convertId(id: string | ObjectId): ObjectId | string {
    try {
      return new ObjectId(id);
    } catch {
      return id;
    }
  }

  /*
  * Get All users
  * @params null
  * @return schema.IStoredUser[]
  */
  public async getAllUsers(): Promise<schema.IStoredUser[]> {
    return await new Promise((resolve, reject) => {
      try {
        const allUser = this.users.find({});
        Logger.instance.debug('GetAllUsers',allUser);
        if(allUser) {
          resolve(this.mapDoc(allUser));
        } else {
          reject(new NotFoundError("All Users"));
        }
      } catch (error) {
        Logger.instance.error('Get All Users', error);
        reject(new RepositoryInternalError(error as Error));
      }
    });
  }

  /*
  * Get User Information by ID
  * @params user Id : string
  * @return schema.IStoredUser
  */
  public async getUserById(id: string): Promise<schema.IStoredUser> {
    return await new Promise((resolve, reject) => {
      try {
        const doc = this.users.findOne<schema.IStoredUser>({ _id: this.convertId(id) });
        Logger.instance.debug('getUserById', doc);
        if (doc) {
          resolve(this.mapDoc(doc));
        } else {
          reject(new NotFoundError('User'));
        }
      } catch (error) {
        Logger.instance.error('getUserById', error);
        reject(new RepositoryInternalError(error as Error));
      }
    });
  }

  public async upsertUserData(payload: schema.IUserData): Promise<boolean> {
    try {
      const result = await this.users.updateOne(
        { email: payload.email },
        { $set: payload },
        { upsert: true }
      );
      Logger.instance.debug('upsertUserData result', result);
      if (result.modifiedCount !== undefined) {
        Logger.instance.debug('upsertUserData', payload);
        // If modifiedCount is defined, the operation was successful
        return true;
      } else {
        // If modifiedCount is not defined, the operation was not successful
        return false;
      }
    } catch (error) {
      Logger.instance.error('upsertUserData', error);
      throw new RepositoryInternalError(error as Error);
    }
  }

}
