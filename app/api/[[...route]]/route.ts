import { Hono } from "hono";
import { handle } from "hono/vercel";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import accounts from "./accounts";
import { HTTPException } from "hono/http-exception";


const app = new Hono().basePath('/api');

app.use( "/api/*", prettyJSON());
app.use('/api/*', cors());

app.onError( (err, c) => {
    if( err instanceof HTTPException) {
        return err.getResponse();
    }
    return c.json({
        error: "Internal Error"
    }, 500);
});

const routes = app.route("/accounts", accounts);

export const GET = handle( app );
export const POST = handle( app );


export type Apptype = typeof routes;