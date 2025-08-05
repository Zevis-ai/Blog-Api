/**
 * @copyright Zevi Friedman
 * @license Apache-2.0
 */

/**
 * node_modules
 */

import { Router } from "express";

/**
 * Controllers
 */

import register from "@/controllers/v1/auth/register";

/**
 * Middlewares
 */

/**
 * Models
 */

const router = Router();

router.post("/register", register);

export default router;