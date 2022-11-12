export interface IUser {
  email: string;
  password: string;
}

export interface ILoginResponce {
  token: string;
}

export interface ISize {
  size: string;
  amount: number;
  _id?: string;
}

export interface ICategory {
  sex: string;
  category: string;
  product: string;
  code: string;
  name: string;
  price: number;
  imageSrc?: string;
  sizes: ISize[];
  user?: string;
  _id?: string;
}

export interface ICategoryResponse {
  categories: ICategory[],
  length?: number,
  offset?: number,
  limit?: number
}

export interface IMessage {
  message: string
}

export interface IList {
  name: string;
  value: any;
}

export interface IProductList {
  footwear: IList[];
  clothes: IList[];
}

export interface IOrderResponse {
  orders: IOrder[];
  length?: number;
  offset?: number;
  limit?: number;
}

export interface IOrderItem {
  amount: number;
  category: ICategory;
  size: ISize;
  _id?: string;
}

export interface IOrderPosition {
  amount: number;
  cost: number;
  categoryId: string;
  sizeId: string;
  _id?: string;
}

export interface IOrder {
  date?: Date;
  order?: number;
  user?: string;
  list: IOrderPosition[];
  _id?: string;
}
