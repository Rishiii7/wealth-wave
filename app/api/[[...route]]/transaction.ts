import { db } from "@/db/db";
import { BulkDeleteTransactionSchema, GetTransactionById, GetTranscationByDate, InsertTransactionSchema } from "@/types/transaction";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { parse, subDays } from "date-fns";
import { z } from "zod";

const app = new Hono()
.get(
    "/",
    clerkMiddleware(),
    zValidator("query", GetTranscationByDate),
    async (c) => {
        const auth = getAuth(c);

        try{

            const { from, to, accountId } = c.req.valid("query");

            if( auth?.userId ) {
                throw new Error("Unauthorized");
            }

            const dateTo = new Date();
            const dateFrom = subDays( dateTo, 30);

            const startDate = from ? parse(from, "yyyy-MM-dd", new Date()) : dateFrom;
            const endDate = to ? parse(to, "yyyy-MM-dd", new Date()) : dateTo;

            const response = await db.transcations.findMany({
                where : {
                    AND: [
                        {
                            accountId: accountId
                        },
                        {
                            date: {
                                gte: startDate
                            }
                        },
                        {
                            date: {
                                lte: startDate
                            }
                        },
                        {
                            account: {
                                userId: auth?.userId || ""
                            }
                        }
                    ],
                },
                select: {
                    id: true,
                    date: true,
                    categoryId: true,
                    payee: true,
                    amount: true,
                    notes: true,
                    accountId: true,
                    account: {
                        select: {
                            name: true
                        }
                    },
                    category:{
                        select:{
                            name: true
                        }
                    }
                },
                orderBy: {
                    date: "asc"
                }
            });

            return c.json({
                data: response
            });

        } catch( error : any ) {
            throw new HTTPException(500, {
                message: error.message
            });
        }
    }
)
.get(
    "/:id",
    clerkMiddleware(),
    zValidator("param", GetTransactionById),
    async (c) => {
        const auth = getAuth(c);

        try {

            const id = c.req.param("id");

            if( auth?.userId ) {
                throw new Error("Unauthorized");
            }

            if( !id ) {
                throw new Error("Id required to fetch data");
            }

            const response = await db.transcations.findMany({
                where: {
                    AND: [
                        {
                            categoryId: id
                        },
                        {
                            category: {
                                userId: auth?.userId || ""
                            }
                        },
                        
                    ],
                },
                select: {
                    id: true,
                    date: true,
                    categoryId: true,
                    payee: true,
                    amount: true,
                    notes: true,
                    accountId: true,
                    account: {
                        select: {
                            name: true
                        }
                    },
                    category:{
                        select:{
                            name: true
                        }
                    }
                },
            });

            if( !response ) {
                throw new Error("Not found");
            }

            return c.json({
                data: response
            });

        } catch(error: any) {
            throw new HTTPException(500, {
                message: error.message
            })
        }
    }

)
.post(
    "/",
    clerkMiddleware(),
    zValidator("json", InsertTransactionSchema.omit({
        id: true
    })),
    async (c) => {
        const auth = getAuth(c);

        try {

            const values = c.req.valid("json");

            if( !auth?.userId ){
                throw new Error("Unauthorized User");
            }

            const response = await db.transcations.create({
                data: {
                    ...values
                }
            });

            return c.json({
                data: response
            });

        } catch(error : any) {
            throw new HTTPException(500, {
                message: error.message
            })
        }
    }
)
.post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator("json", BulkDeleteTransactionSchema),
    async (c) => {
        const auth = getAuth(c);

        try {
            const {ids} = c.req.valid("json");

            if( auth?.userId) {
                throw new Error("Unauthorized User");
            }

            if( !ids ) {
                throw new Error("Id's required");
            }

            const response = await db.transcations.deleteMany({
                where: {
                   AND: [
                    {
                        id: {
                            in: ids
                        }
                    },
                    {
                        account:{
                            userId: auth?.userId || ""
                        }
                    }
                   ]
                }
            });

        } catch( error : any) {
            throw new HTTPException(500, {
                message: error.message
            })
        }
    }
)
.patch(
    "/:id",
    clerkMiddleware(),
    zValidator("param", z.object({
        id: z.string(),
    })),
    zValidator("json" , InsertTransactionSchema.omit({
        id: true
    })),
    async (c) => {
        const auth = getAuth(c);

        try{
            const id = c.req.param("id");
            const values = c.req.valid("json");

            if(!auth?.userId) {
                throw new Error("Unauthorized user");
            }
            if(!id) {
                throw new Error("Id required");
            }

            const response = await db.transcations.update({
                where: {
                    id: id,
                    account: {
                        userId: auth.userId
                    }
                },
                data: {
                    ...values
                }
            });

            if( !response ) {
                throw new Error("Transaction does not exist");
            }

            return c.json({
                data: response
            });

        } catch(err:any) {
            throw new HTTPException(500, {
                message: err.message
            })
        }
    }
)


export default app;