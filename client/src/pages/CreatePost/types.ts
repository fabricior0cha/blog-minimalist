export interface Post {
    id?: number;
    title?: string;
    content?: string;
    date: Date;
    author?: Author;
    tags?: Array<String>;
    likes?: string[];
}

export interface Author {
    id?: string;
    name?: string;
}

export interface Errors{
    title?: string;
    content?: string;
   
}