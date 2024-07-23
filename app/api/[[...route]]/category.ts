import { Hono } from "hono";
import { HTTPException } from 'hono/http-exception';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/db";
import { 
    getCategoryParamInput,
    PostCategoryInput,
    PostBulkDeleteInput
} from "@/types/category";



const app = new Hono()
.get("/" , 
    clerkMiddleware(),
    async (c) => {
    try{
        const auth = getAuth(c);

        // console.log("[USER_ID] : " + auth?.userId)
        
        if( ! auth?.userId ) {
            throw new Error("Unauthorized User");
        }

        const response = await db.category.findMany({
            where:{
                userId: auth.userId
            },
            select: {
                id: true,
                name: true
            }
        });
        
        // console.log( JSON.stringify(response));
        
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
})
.get(
    "/:id",
    clerkMiddleware(),
    zValidator("param", getCategoryParamInput),
    async (c) => {
        try {
            const auth = getAuth(c);
            const id = c.req.param("id");

            if( !auth?.userId) {
                throw new Error(" Unauthorized ");
            }
            
            if(!id) {
                throw new Error(" Id required ");
            }

            const response = await db.category.findUnique({
                where:{
                    id: id,
                    userId: auth.userId
                },
                select: {
                    id: true,
                    name: true
                }
            });

            return c.json({
                data : response
            });

        } catch( error: any ) {
            throw new HTTPException(500, {
                message: error.message
            });
        }
    }
)
.post("/",
    clerkMiddleware(),
    zValidator(
        "json", 
        PostCategoryInput.pick({ name: true}) 
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

            const response = await db.category.create({
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
.post("/bulk-delete",
    clerkMiddleware(),
    zValidator(
        "json",
        PostBulkDeleteInput
    ),
    async (c) => {
        try {

            const auth =  getAuth(c);
            const value = c.req.valid("json");
            
            // if(! auth?.userId) {
            //     throw new Error("Unathorized");
            // }

            const response = await db.category.deleteMany({
                where: {
                    id: {
                        in: value.ids
                    }
                },
            });

            // console.log('[POST BULK DELETE OPERATION RESPONSE] :  ' + JSON.stringify(response));

            return c.json({
                message: response
            })



        } catch( error : any) {
            throw new HTTPException(500, {
                message: error.message
            });
        }
    }
)
.post("/update", 
    clerkMiddleware(),
    zValidator("json", z.object({
        id: z.string(),
        name: z.string()
    })),
    async ( c )  => {
        const auth = getAuth(c);

        try {
            const { name, id } = c.req.valid("json");
            if( !auth?.userId) {
                throw new Error(" Unauthorized ");
            }
            
            if( !name ) {
                throw new Error(" No Update for name ");
            }

            const response = await db.category.update({
                where: {
                    id: id,
                    userId: auth.userId,
                },
                data : {
                    name: name
                },
                select: {
                    id: true,
                    name: true
                }
            });

            return c.json({
                data: response
            });


        } catch( error : any ) {
            throw new HTTPException(500 , {
                message: error.message
            })
        }
    }
)

export default app;