import { z }  from "zod";

export const PostAccountInput = z.object({
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

export type PostAccountInputType = z.infer<typeof PostAccountInput>