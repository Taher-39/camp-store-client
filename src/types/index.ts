export type TProduct = {
  _id?: string;
  name: string;
  description: string;
  category: string;
  status: string;
  price: number;
  quantity: number;
  weight: number;
  images: string[];
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
  image: string;
  name: string;
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
  name: string;
  shippingAddress: IShippingAddress;
  couponCodeUsed?: string;
  note?: string;
  subtotal: number;
  shipping?: string;
  shippingCost: number;
  totalPrice: number;
  paymentMethod: string;
  orderStatus?: OrderStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserRef {
  _id: string;
  name: string;
  avatar?: string;
}

export interface IProductRef {
  _id: string;
  name: string;
}

export interface IReview {
  _id: string;
  productId: string | IProductRef;
  userId: string | IUserRef;
  rating: number;
  comment: string;
  images?: string[];
  isVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IReviewInput {
  productId: string;
  rating: number;
  comment: string;
  images?: string[];
}

export interface IReviewApiResponse {
  success: boolean;
  message: string;
  data: IReview | IReview[];
}