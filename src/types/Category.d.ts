export interface ICategory {
  id?: number;
  name?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateCategory {
  name: string;
  description: string;
}

export interface IUpdateCategory {
  name?: string;
  description?: string;
}
