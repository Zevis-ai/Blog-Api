/**
 * @copyright Zevi Friedman
 * @license Apache-2.0
 */

/**
 * Custom modules
 */

import {logger} from "@/lib/winston";
import config from "@/config";
import { genUsername } from "@/utils";


/**
 * Models
*/
import User from "@/models/user";

/**
 * Types
*/
import type { IUser } from "@/models/user";
import type { Request, Response } from "express";

type UserData = Pick<IUser, "role" | "email" | "password">

const register = async (req: Request, res: Response): Promise<void> => {
    const {role, email, password} = req.body as UserData;

    console.log("Registering new user", req.body);
    

    
    try {
        const userName = genUsername();

        const newUser = await User.create({
            userName,
            email,
            password,
            role,
        })


        //generate access token end refresh token for the new user


        res.status(201).json({
            user: {
                userName : newUser.userName,
                email: newUser.email,
                role: newUser.role,
            },
            
        })
    } catch (error) {
        res.status(500).json({
            code: 'ServerError',
            message: "Internal Server Error",
            error
        })

        logger.error(`Failed to register user: ${error}`);
    }
}

export default register