import express from "express";
import CommentController from "../controller/comment.controller.js";

const router = express.Router();

const commentController = new CommentController

router.get("/:postId", commentController.commentGet)
router.post("/:postId", commentController.commentCreate)
router.patch("/:commentId", commentController.commentUpdate)
router.delete("/:commentId", commentController.commentDelete)


export default router;
