/**
 * @copyright Zevi Friedman
 * @license Apache-2.0
 */

/**
 * node_modules
 */

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";

/**
 * Custom modules
 */
import config from "./config";
import limiter from "./lib/express_rate_limit";

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

// Enable JSON request body parsing
app.use(express.json());

// Enanle URL encoded request body parsing
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compression({
    threshold: 1024, //only compress if the response size is greater than 1024 bytes
}));



//Apply helmet middleware
app.use(helmet());

//Apply rate limit middleware
app.use(limiter);

app.get("/", (req, res) => {
    res.json({
        message: "Hello world"
    });
})


app.listen(config.PORT, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
})