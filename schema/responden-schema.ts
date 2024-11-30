import { z } from "zod";

export const respondenSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }).max(30, { message: "Name must be less than 30 characters" }),
    respon:z.string().trim(),
    rating:z.number().min(1).max(5)
})

export type RespondenSchema ={
    id?:string
    name:string
    respon:string
    rating:number
    image:string
}