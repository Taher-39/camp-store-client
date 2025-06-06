export type TProduct = {
  _id?: string;
  name: string;
  description: string;
  category: string;
  status: string;
  price: number;
  quantity: number;
  image?: string;
};

export type TCategory = {
  category: string;
  image?: string;
  _id?: string;
}

export type TUser = {
  email: string;
  userId: string;
  role: string;
  iat: number;
  exp: number;
};

export type TAuthState = {
  user: null | TUser;
  token: null | object;
};

export interface IAddress {
  phone: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

export interface IUser {
  _id: string;
  email: string;
  name?: string;
  avatar?: string;
  role: string;
  status: string;
  addresses?: IAddress[];
  lastLogin?: string;
  isDeleted: boolean;
}
