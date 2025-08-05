/**
 * @copyright Zevi Friedman
 * @license Apache-2.0
 */

/**
 * node_modules
 */

import {rateLimit} from "express-rate-limit";

// configure rate limit
const limiter = rateLimit({
    windowMs: 60000, // 1 minute
    limit: 60,// limit each IP to 60 requests per windowMs
    standardHeaders: "draft-8",// use the 'RateLimit-Remaining' header
    legacyHeaders: false,// disable the 'X-RateLimit-*' headers
    message: {
        errer: 'You have sent too many requast in a givan amount of time, please try again later.'
    }
});

export default limiter
