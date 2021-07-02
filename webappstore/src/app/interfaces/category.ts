export interface Category {
    ok?:       boolean;
    category?: CategoryElement[];
}

export interface CategoryId {
    ok?:       boolean;
    category?: CategoryElement;
}



export interface CategoryElement {
    id?:        number;
    name?:      string;
    keywords?:  string;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface PostResponse {
    ok?:      string;
    message?: string;
    data?:CategoryElement;
}



export interface DataCategory{
    ok?: boolean;
    id?        : number;
    colortitle?: string;
    estado?    : boolean;
    data?      : CategoryElement;
    list?      : CategoryElement[];
}

