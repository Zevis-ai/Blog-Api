/**
 * @copyright Zevi Friedman
 * @license Apache-2.0
 */

/**
 * Node_modules
 */

import winston from "winston";

/**
 * Custom modules
 */
import config from "@/config";

const { combine, timestamp,json, errors, align, printf , colorize} = winston.format;

// Define the transport array to hold the different logging transports
const transports: winston.transport[] = []

//if the application is not running in production, add console transport

if (config.NODE_ENV !== 'production') {
    transports.push(
        new winston.transports.Console({
            
            format: combine(
                colorize({all: true}),// add color to log levels
                timestamp({format: 'YYYY-MM-DD HH:mm:ss A'}),// add timestamp to log
                align(),
                printf(({ timestamp, level, message, ...meta }) => {
                    const metaStr = Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : '';
                    return `${timestamp} [${level.toUpperCase()}] ${message}${metaStr}`;
                })
            )
        })
    )
}

// Create a looger instance using Winston

const looger = winston.createLogger({
    level: config.LOG_LEVEL || 'info',
    format: combine(timestamp(), errors({stack: true}), json()),
    transports,
    silent: config.NODE_ENV === 'test',// disable logging in test environment
})


export {looger}