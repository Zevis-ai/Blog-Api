/**
 * @copyright Zevi Friedman
 * @license Apache-2.0
 */

/**
 * node_modules
 */

import express from "express";
import cors from "cors";

/**
 * Custom modules
 */
import config from "./config";

/**
 * Types
 */

import type { CorsOptions } from "cors";


/**
 * Express App initial
 */

const app = express();

// Confg CORS initial
const corsOptions: CorsOptions = {
    origin(origin, callback){
        if(config.NODE_ENV === "development" || !origin || config.WHITELIST_ORIGINS.includes(origin)){
            callback(null, true);
        }else{
            callback(new Error(`CORS Error ${origin} is not allowed`), false);
        }
        console.log(`CORS Error ${origin} is not allowed`);
    }
}

//Apply cors middleware
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.json({
        message: "Hello world"
    });
})


app.listen(config.PORT, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
})