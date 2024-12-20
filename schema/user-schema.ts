import { z, ZodType } from "zod";

export default class UserSchema {
    static readonly UserRegisterSchema: ZodType = z
        .object({
            username: z.string()
                .trim()
                .min(3, { message: "Name must be at least 3 characters" })
                .max(30, { message: "Name must be less than 30 characters" }),
            email: z.string()
                .trim()
                .email({ message: "Invalid email" }),
            password: z.string()
                .min(8, { message: "Password must be at least 8 characters" })
                .regex(/^(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/, {
                  message: "Password must include at least one number.",
                }),
            confirmPassword: z.string()
                .min(8, { message: "Confirm password must be at least 8 characters" })
                .regex(/^(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/, {
                  message: "Confirm password must include at least one number.",
                }),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        });

    static validateUserRegistration(data: unknown) {
        return this.UserRegisterSchema.safeParse(data);
    }

    static readonly UserLoginSchema: ZodType = z
        .object({
            email: z.string().trim().email({ message: "Invalid email" }),
            password: z.string()
                .min(8, { message: "Password must be at least 8 characters" })
                .regex(/^(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/, {
                  message: "Password must include at least one number.",
                })
              ,  
        });
    
        static validateUserLogin(data: unknown) {
            return this.UserLoginSchema.safeParse(data);
        }

        static readonly UserEditSchema = z
          .object({
            username: z
              .string()
              .trim()
              .min(3, { message: "Name must be at least 3 characters" })
              .max(30, { message: "Name must be less than 30 characters" })
              ,
            
            email: z
              .string()
              .trim()
              .email({ message: "Invalid email address" })
              ,    
            password: z
              .string()
              .min(8, { message: "Password must be at least 8 characters long" })
              .regex(/^(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/, {
                message: "Password must include at least one number.",
              })
              .or(z.literal(""))
              ,              
            confirmPassword: z
              .string()
              .min(8, { message: "Confirm password must be at least 8 characters long" })
              .or(z.literal(""))
              , 
            image: z.string().or(z.literal("")),
          })
          .refine(
            (data) => {
              if (data.password || data.confirmPassword) {
                return data.password === data.confirmPassword;
              }
              return true;
            },
            {
              message: "Passwords do not match",
              path: ["confirmPassword"],
            }
          );
        

        static readonly validateUserEdit=(data:unknown)=>{
            return this.UserEditSchema.safeParse(data)
        }
}


