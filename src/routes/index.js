import express from "express";

const router = express.Router();

import userRouter from "./user.routes.js";
import postRouter from "./post.routes.js";
import commentRouter from "./comment.routes.js";

router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);

export default router;
