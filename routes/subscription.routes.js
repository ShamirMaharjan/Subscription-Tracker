import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import { createSubscription, getuserSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
    res.send("get all subscriptions")
})

subscriptionRouter.get("/:id", (req, res) => {
    res.send("get subscription details")
})

subscriptionRouter.post("/", authorize, createSubscription)

subscriptionRouter.put("/:id", (req, res) => {
    res.send("update subscription")
})

subscriptionRouter.delete("/:id", (req, res) => {
    res.send("delete subscription")
})

subscriptionRouter.get("/user/:id", authorize, getuserSubscription)

subscriptionRouter.put("/:id/cancel", (req, res) => {
    res.send("cancel subscription")
})

subscriptionRouter.get("/upcoming-renwals", (req, res) => {
    res.send("get upcoming renewals")
})


export default subscriptionRouter;