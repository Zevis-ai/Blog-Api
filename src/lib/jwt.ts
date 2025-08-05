/**
 * @copyright Zevi Friedman
 * @license Apache-2.0
 */

/**
 * Node_modules
 */
import jwt from "jsonwebtoken";


/**
 * Custom modules
 */
import config from "@/config";


/**
 * Types
 */
import { Types } from "mongoose";


/**
 * Generate access token
 */
export const generateAccessToken = (userId : Types.ObjectId): string => {
    return jwt.sign({userId}, config.JWT_ACCESS_SECRET, {
        expiresIn: config.ACCESS_TOKEN_EXPIRY,
        subject: 'accessToken',
    })
}

export const generateRefreshToken = (userId : Types.ObjectId): string => {
    return jwt.sign({userId}, config.JWT_REFRESH_SECRET, {
        expiresIn: config.REFRESH_TOKEN_EXPIRY,
        subject: 'refreshToken',
    })
}