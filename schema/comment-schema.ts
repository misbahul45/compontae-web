import { z, ZodType } from "zod";

export class CommentSchema {
    static readonly createCommentSchema: ZodType = z
        .object({
            body: z.string()
                .trim()
                .min(3, { message: "Content must be at least 3 characters" })
                .max(1000, { message: "Content must be less than 1000 characters" }),
        });
}