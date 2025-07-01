import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import { createSubscription, deleteSubscription, getAllSubscription, getSuscriptionDetails, getuserSubscription, updateSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", getAllSubscription)

subscriptionRouter.get("/:id", getSuscriptionDetails)

subscriptionRouter.post("/", authorize, createSubscription)

subscriptionRouter.put("/:id", authorize, updateSubscription)

subscriptionRouter.delete("/:id", authorize, deleteSubscription)

subscriptionRouter.get("/user/:id", authorize, getuserSubscription)

subscriptionRouter.put("/:id/cancel", (req, res) => {
    res.send("cancel subscription")
})

subscriptionRouter.get("/upcoming-renwals", (req, res) => {
    res.send("get upcoming renewals")
})


export default subscriptionRouter;