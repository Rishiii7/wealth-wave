import { z }  from "zod";

export const PostCategoryInput = z.object({
    id: z.string(),
    name: z.string().min(1, {
        message: "Required at least one character"
    }),
    userId: z.string(),
    plaidId: z.string(),
});

export const PostBulkDeleteInput = z.object({
    ids: z.array(z.string())
});

export const getCategoryParamInput = z.object({
    id: z.string()
})

export type PostCategoryInputType = z.infer<typeof PostCategoryInput>