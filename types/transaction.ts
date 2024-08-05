import { z } from "zod";

export const GetTranscationByDate = z.object({
    from:       z.string().optional(),
    to:         z.string().optional(),
    accountId:  z.string().optional()
});

export const GetTransactionById = z.object({
    id:         z.string()
});

export const InsertTransactionSchema = z.object({
    id:         z.string(),
    amount:     z.number(), 
    payee:      z.string(),
    date:       z.coerce.date(), 
    notes:      z.string().optional(),
    accountId:  z.string(),
    categoryId: z.string()
});

export const BulkCreateTransactionSchema = z.object({
    data: z.array(InsertTransactionSchema.omit({
        id: true
    }))
});


export const BulkDeleteTransactionSchema = z.object({
    ids: z.array(z.string())
});

