export interface IPost {
    id?: string;
    title?: string;
    content?: string;
    date: Date;
    author?: Author;
    tags?: Array<String>;
    likes: string[];
}

export interface Author {
    id: string;
    name?: string;
}
