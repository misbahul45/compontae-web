import { z, ZodType } from "zod";

export default class PostSchema {
    static readonly PostSchema: ZodType = z
        .object({
            title: z.string()
                .trim()
                .min(3, { message: "Title must be at least 3 characters" }),
            description: z.string()
                .trim()
                .min(3, { message: "Description must be at least 3 characters" }),
            image: z.string()
                .trim(),
        })
    static validatePostSchema(data: any) {
        return PostSchema.PostSchema.safeParse(data);
    }
}