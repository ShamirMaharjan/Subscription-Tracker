import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
    res.send("get all subscriptions")
})

subscriptionRouter.get("/:id", (req, res) => {
    res.send("get subscription details")
})

subscriptionRouter.post("/", (req, res) => {
    res.send("create subscription")
})

subscriptionRouter.put("/:id", (req, res) => {
    res.send("update subscription")
})

subscriptionRouter.delete("/:id", (req, res) => {
    res.send("delete subscription")
})

subscriptionRouter.get("/user/:id", (req, res) => {
    res.send("get all user subscription")
})

subscriptionRouter.put("/:id/cancel", (req, res) => {
    res.send("cancel subscription")
})

subscriptionRouter.get("/upcoming-renwals", (req, res) => {
    res.send("get upcoming renewals")
})


export default subscriptionRouter;