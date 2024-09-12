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
