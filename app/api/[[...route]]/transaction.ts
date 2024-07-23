import { db } from "@/db/db";
import { GetTransactionById, GetTranscationByDate } from "@/types/transaction";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { parse, subDays } from "date-fns";

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


export default app;