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
import config from "./config";

/**
 * Express App initial
 */

const app = express();

app.get("/", (req, res) => {
    res.json({
        message: "Hello world"
    });
})


app.listen(config.PORT, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
})