/**
 * @copyright Zevi Friedman
 * @license Apache-2.0
 */

/**
 * node_modules
 */

import mongoose from "mongoose";

/**
 * Custom modules
 */
import config from "@/config";
import { logger } from "@/lib/winston";

/**
 * Types
 */
import type { ConnectOptions } from "mongoose";

/**
 * Client option
 */

const clientOptions: ConnectOptions = {
    dbName: 'blog-db',
    appName: 'Blog API',
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
    }
};

export const connectToDatabase = async () : Promise<void> => {
    if (!config.MONGO_URI) {
        throw new Error("MONGO_URI is not defined");
    }
    try {
        await mongoose.connect(config.MONGO_URI, clientOptions);
        logger.info("Database connected", {
            uri: config.MONGO_URI,
            options: clientOptions,
        });
    } catch (error) {
        if (error instanceof Error) {
            throw error            
        }
        logger.error(`Failed to connect to database: ${error}`);
    }
}

export const disconnectFromDatabase = async () : Promise<void> => {
    try {
        await mongoose.disconnect();
        logger.info("Disconnected from database successfully. ", {
            uri: config.MONGO_URI,
            options: clientOptions,
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to disconnect from database: ${error.message}`);            
        }
        logger.error(`Failed to disconnect from database: ${error}`);
    }
}
