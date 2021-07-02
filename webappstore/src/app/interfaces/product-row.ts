export interface ResponseProduct {
    ok?      : boolean;
    count?   : number;
    products?: ProductRow[];
    size?    : number;
}

export interface ProductRow {
    id?:         number;
    name?:       string;
    color?:      string;
    size?:       string;
    price?:      string;
    createdAt?:  Date;
    updatedAt?:  Date;
    categoryId?: number;
    stores?:     Store[];
}

export enum Color {
    Black = "Black",
    Red = "red",
}

export enum Size {
    Mediano = "mediano",
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
    Productstore?: Productstore;
}

export interface Productstore {
    createdAt?: Date;
    updatedAt?: Date;
    productId?: number;
    storeId?:   number;
}

export enum City {
    Bellavista = "Bellavista",
    California = "California",
}

export enum Country {
    Ecuador = "Ecuador",
    UnitedState = "United State",
}

export enum Name {
    NorthWareHouse = "North WareHouse",
    SouthWareHouse = "South WareHouse",
}

export enum Street {
    CalleFourFlorida = "calle four Florida",
    CalleSouthFlorida = "calle south Florida",
}
