export interface StoreResponse {
    ok?     : string;
    message?: string;
    store?  : Store;
}

export interface Store {
    id?       : number;
    name?     : string;
    street?   : string;
    number?   : number;
    zipcode?  : string;
    city?     : string;
    country?  : string;
    //product?  : number;
    updatedAt?: Date;
    createdAt?: Date;
}

export interface ListStore {
    ok?    : boolean;
    stores?: Store[];
}

export interface GetStore {
    ok?   : boolean;
    store?: Store;
}

export interface MsgStore {
    ok?     : boolean;
    message?: string;
}

export interface StoreSub {
    ok?    : boolean;
    id?    : number;
    data?  : Store;
    list?   : Store[];
    styles?: Style;
}

export interface Style{
    color? : string;
    status?: boolean;
}