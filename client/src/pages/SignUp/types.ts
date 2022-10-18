export interface UserNew {
    name?: string;
    email?: string;
    password?: string;
}

export interface Errors{
    name?: string;
    email?: string;
    password?:string;
    confirmPassword?: string;
}

export interface Password{
    password?: string;
    confirmPassword?: string;
}

export interface Notification{
    type?: string;
    message?: string;
    open?: boolean;
}