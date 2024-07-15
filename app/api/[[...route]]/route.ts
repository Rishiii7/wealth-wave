import { Hono } from "hono";
import { handle } from "hono/vercel";
import { prettyJSON } from "hono/pretty-json";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { cors } from "hono/cors";

const schema = z.object({
    name: z.string(),
    age: z.number(),
});

const app = new Hono().basePath('/api');

app.use( "/api/*", prettyJSON());
app.use('/api/*', cors())

app.get("hello", (c) => {
    return c.json({
        message: "hello from Next.js"
    });
});


app.post("/author", zValidator("json", schema), (c) => {
    const data = c.req.valid("json");

    return c.json({
        success: true,
        message: `${data.name} is ${data.age}`
    });
});

export const GET = handle( app );
export const POST = handle( app );
