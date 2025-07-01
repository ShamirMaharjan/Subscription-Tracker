import aj from "../config/arcjet.js";
import { NODE_ENV } from "../config/env.js";

export const arcjetMiddleware = async (req, res, next) => {

    if (NODE_ENV === "development") {
        return next();
    }

    try {
        const decision = await aj.protect(req, { requested: 1 });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                res.status(429).json({ message: "Rate limit exceeded" })
            }

            if (decision.reason.isBot()) return res.status(403).json({ message: "Bot detected" })


            return res.status(403).json({ message: "Access denied" })
        }

        next();

    } catch (error) {
        console.log(`Arcjet Middleware Error: ${error}`);
        next(error)
    }
}