import z from "zod"

export const postSchema = z.object({
    title : z.string().min(1).max(30),
    link : z.string().min(1, "Link cannot be empty").optional(),
    type : z.string()
})