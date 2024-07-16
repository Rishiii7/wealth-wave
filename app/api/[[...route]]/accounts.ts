import { Hono } from "hono";
import { HTTPException } from 'hono/http-exception';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';

import { db } from "@/db/db";


const app = new Hono()
.get("/" , 
    clerkMiddleware(),
    async (c) => {
    try{
        const auth = getAuth(c);

        if( ! auth?.userId ) {
            throw new Error("Unauthorized User");
        }

        const response = await db.accounts.findMany({
            where:{},
            select: {
                id: true,
                name: true
            }
        });
        
        console.log( JSON.stringify(response));
        
        return c.json({
            message: response
        });
    } catch ( error: any){
        // console.log( error.message )
        throw new HTTPException( 401, {
           res: c.json({
            error: error.message
           })
        });
    }
});

export default app;