'use server'
import { signIn } from "@/auth"
import prisma from "@/lib/db"
import UserSchema from "@/schema/user-schema"
import { UserLoginType, UserRegisterType } from "@/schema/user-types"
import bcrypt from "bcryptjs"

export const createUser=async(userRegister:UserRegisterType)=>{

    const isValidSchema=UserSchema.validateUserRegistration(userRegister)
    if(!isValidSchema) return null

    const { confirmPassword, password ,...data }=userRegister
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user=await prisma.user.create({
            data:{
                ...data,
                password:hashedPassword
            }
        })
        return user
    } catch (error) {
        console.log(error)  
        return null
    }
}

export const comparePassword=async(password:string,userPassword:string)=>{
    return await bcrypt.compare(password,userPassword)
}

export const loginUser=async(userLogin:UserLoginType)=>{
    const isValidSchema=UserSchema.validateUserLogin(userLogin)
    if(!isValidSchema) return null

    const user=await signIn('credentials',userLogin)
    if(!user) return null

    return user
}