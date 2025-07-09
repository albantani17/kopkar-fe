import { ICategory } from "./Category";

export interface IProduct {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  category?: ICategory;
}

export interface ICreateProduct {
  name: string;
  description: string;
  price: number | string;
  image: string | FileList;
  category_id: string;
}

export interface IUpdateProduct {
  name?: string;
  description?: string;
  price?: number | string;
  image?: string | FileList;
  category_id?: string;
}
