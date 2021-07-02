import { CategoryElement } from './category';



export interface ListProduct {
    ok?:      boolean;
    products?: Product[];
}

export interface Product {
    id?:        number;
    name?:      string;
    color?:     string;
    size?:      string;
    price?:     string;
    stores?:     Store[];
    categoryId?: number; 
    createdAt?: Date;
    updatedAt?: Date;
    category : CategoryElement;
}

export interface UpdateResponse {
    ok?:      string;
    message?: string;
}

export interface ProductCreate {
    ok?:      string;
    message?: string;
    data?:    Product;
}

export interface ProductGet{
    ok?:      string;
    data?:    Product;
}

export interface ProductStore{
    ok?     : boolean;
    id?     : number;
    data?   : Product;
    List?   : Product[];
    page?   : number;
    pagemax?: number;
    search? : Product[];
    sepage?   : number;
    sepagemax?: number;
    styles? : Style;
    consult?: boolean;
}

export interface PagesProduct {
    ok?:       boolean;
    count?:    number;
    products?: Product[];
    page?:     number;
    size?:     number;
    message?: string; 
}

export interface Style{
    color?: string;
    status?: boolean;
}

export interface ProductOne {
    ok?:      boolean;
    product?: Product;
}



export interface ProductStoreForm {
    ok?:      boolean;
    product?: ProductStore;
}



export interface StoreP {
    id?:   number;
    name?: string;
}

export interface Store {
    id?:           number;
    name?:         string;
    street?:       string;
    number?:       number;
    zipcode?:      string;
    city?:         string;
    country?:      string;
    createdAt?:    Date;
    updatedAt?:    Date;
    Productstore?: Productstorex;
}

export interface Productstorex {
    createdAt?: Date;
    updatedAt?: Date;
    productId?: number;
    storeId?:   number;
}
