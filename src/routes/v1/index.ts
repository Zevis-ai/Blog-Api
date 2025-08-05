/**
 * @copyright Zevi Friedman
 * @license Apache-2.0
 */

/**
 * node_modules
 */

import express from "express";

/**
 * Custom modules
 */

const router = express.Router();

/**
 *  Routes
 */

import authRoutes from "@/routes/v1/auth";


/**
 * Root route
 */

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Api is live",
        status: "ok",
        version: "1.0.0",
        docs: "https://docs.blog-api.codewithsadee.com",
        timestamp: new Date().toISOString(),
        
    });
});

router.use("/auth", authRoutes);

export default router;
