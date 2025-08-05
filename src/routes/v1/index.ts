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

export default router;
