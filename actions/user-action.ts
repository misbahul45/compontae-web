'use server'
import { signIn } from "@/auth"
import prisma from "@/lib/db"
import UserSchema from "@/schema/user-schema"
import { UserEdit, UserLoginType, UserRegisterType } from "@/schema/user-types"
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
        if(user){
          return true
        }
        throw new Error('User already exist');
    } catch (error) {
        return false
    }
}

export const comparePassword: (password: string, userPassword: string) => Promise<boolean> = async (password: string, userPassword: string) => {
  return await bcrypt.compare(password, userPassword)
}

export const loginUser=async(userLogin:UserLoginType)=>{
    const isValidSchema=UserSchema.validateUserLogin(userLogin)
    if(!isValidSchema) return null

    const user=await signIn('credentials',userLogin)
    if(!user) return null
    return true
}

export const updateUser=async(user:UserEdit)=>{
  try {
    const password=user.password as string
    if(password!==''){
        user.password=await bcrypt.hash(password, 10);
    }
    await prisma.user.update({
      where:{
        email:user.email as string
        },
       data:{
        username:user.username as string,
        email:user.email as string,
        image:user.image as string,
        ...(password !=='' && {password:user.password as string} )
       }
    })
    return true
  } catch (error) {
    return error
  }
}

export const getUser=async(email:string)=>{
    try {
      const user=await prisma.user.findUnique({
        where:{email},
        select:{
          id:true,
          email:true,
          image:true,
          username:true,
          role:true
        }
      })
      return user
    } catch (error) {
      return null
    }
}

export const deletUser=async(email:string)=>{
  try {
    const istrue=await prisma.user.delete({
      where:{email}
    })
    if(!istrue) throw new Error('User not found')
    return true
  } catch (error) {
    return false
  }
}