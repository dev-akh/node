
export interface IWithMongoID {
  readonly _id: string;
}

export interface IWithID {
  readonly id: string;
}

export interface IUserData {
  email: string;
  emailVerified: boolean;
  name: string;
  picture: string;
  phone: string;
  city: string;
  address: string;
  age: number;
  fatherName: string;
  joinDate: string;
  userRole: number;
  updatedAt: string;
}

export type IStoredUser = IUserData & IWithMongoID;

