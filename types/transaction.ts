import { z } from "zod";

export const GetTranscationByDate = z.object({
    from: z.string().optional(),
    to: z.string().optional(),
    accountId: z.string().optional()
});

export const GetTransactionById = z.object({
    id: z.string()
});