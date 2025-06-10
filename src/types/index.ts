export type TProduct = {
  _id?: string;
  name: string;
  description: string;
  category: string;
  status: string;
  price: number;
  quantity: number;
  weight: number;
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

export interface ICoupon {
  _id?: string;
  code: string;
  discountPercentage: number;
  expiresAt?: Date | null;
  isActive: boolean;
}

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'
  | 'failed';

export interface IOrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface IShippingAddress {
  phone: string;
  address: string;
  city: string;
  postalCode?: string;
}

export interface IOrder {
  _id?: string;
  userId?: string;
  orderItems: IOrderItem[];
  totalPrice: number;
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  orderStatus?: OrderStatus;
  couponCodeUsed?: string;
  createdAt?: string;
  updatedAt?: string;
}
