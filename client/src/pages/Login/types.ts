export interface UserLogin{
    email?: string;
    password?: string;
}

export interface Notification{
    type?: string;
    message?: string;
    open?: boolean;
}