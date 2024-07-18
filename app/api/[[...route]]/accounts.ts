import { Hono } from "hono";
import { HTTPException } from 'hono/http-exception';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/db";
import { PostAccountInput } from "@/types/accounts";



const app = new Hono()
.get("/" , 
    clerkMiddleware(),
    async (c) => {
    try{
        const auth = getAuth(c);

        console.log("[USER_ID] : " + auth?.userId)
        
        if( ! auth?.userId ) {
            throw new Error("Unauthorized User");
        }

        const response = await db.accounts.findMany({
            where:{
                userId: auth.userId
            },
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
        console.log( error.message )
        throw new HTTPException( 401, {
           res: c.json({
            error: error.message
           })
        });
    }
})
.post("/",
    clerkMiddleware(),
    zValidator(
        "json", 
        PostAccountInput.pick({ name: true}) 
    ),
    async (c) => {

        try {
            const auth = getAuth(c);

            if( !auth?.userId ) {
                throw new Error("Unauthorized message");
            }

            const { name } = c.req.valid("json");

            // const { name } = await c.req.json();

            // console.log("[NAME_IN_POST_BODY] : " + name);

            const response = await db.accounts.create({
                data: {
                    userId: auth.userId,
                    name: name,
                    plaidId: "",
                },
                select: {
                    name: true,
                    id: true
                }
            });

            return c.json({
                message: response
            });

        } catch( error:any ) {
            // console.log( error );
            throw new HTTPException(500, {
                res: c.json({
                    message: error.message
                })
            })
        }
    }
)

export default app;