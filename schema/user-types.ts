import { z } from "zod";
import UserSchema from "./user-schema";

export type UserRegisterType=z.infer<typeof UserSchema.UserRegisterSchema>

export type UserLoginType=z.infer<typeof UserSchema.UserLoginSchema>

enum role{
    USER="USER",
    ADMIN="ADMIN"
}
export type USER={
    id:string
    username:string
    email:string
    image:string
    identity:role
}

export type UserEdit={
    username:string,
    email:string,
    image?:string,
    password?:string,
    confirmPassword?:string
}