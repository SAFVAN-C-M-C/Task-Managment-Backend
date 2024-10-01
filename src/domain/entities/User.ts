import { Document, ObjectId } from "mongoose"

export interface IUser{
    _id:ObjectId;
    name:string;
    email:string;
}
export interface ILoginUser extends Document{
    _id:ObjectId;
    name:string;
    email:string;
    password: string;
}
export interface IRegisterUser{
    name: string;
    email: string;
    password: string;
}
export interface ILogin{
    email: string;
    password: string;
}