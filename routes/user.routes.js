import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => (
    res.send({ title: "get all users" })
))

userRouter.get("/:id", (req, res) => {
    res.send("get user")
})

userRouter.post("/", (req, res) => {
    res.send("CREATE user")
})

userRouter.put("/:id", (req, res) => {
    res.send("UPDATE user")
})

userRouter.delete("/", (req, res) => {
    res.send("DELETE user")
})

export default userRouter;