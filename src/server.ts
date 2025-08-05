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
import { connectToDatabase, disconnectFromDatabase } from "@/lib/mongoose";

/**
 * Router
 */
import v1Routes from "@/routes/v1";

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

(async ()=>{
    try {
        await connectToDatabase()
        
        app.use("/api/v1", v1Routes);
        
        app.listen(config.PORT, () => {
            console.log(`Server is running on http://localhost:${config.PORT}`);
        })
    } catch (error) {
        console.log(`Failed to start server: ${error}`);

        if(config.NODE_ENV === "production"){
            process.exit(1)
        }
        
    }
}) ();

const handleServerShutdown = async () => {
    try {
        await disconnectFromDatabase();
        console.log("server SHUTDOWN");
        process.exit(0);
        
    } catch (error) {
        console.log(`error during server shutdown: ${error}`);
        
    }
}


process.on("SIGINT", handleServerShutdown);
process.on("SIGTERM", handleServerShutdown);

