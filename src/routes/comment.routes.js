import express from "express";
import CommentController from "../controller/comment.controller.js";
import {authMiddleware} from "../middleware/authMiddleware.js";




const router = express.Router();

const commentController = new CommentController();

router.get("/:postId", commentController.commentGet);
router.post("/:postId", authMiddleware, commentController.commentCreate);
router.patch("/:commentId", authMiddleware, commentController.commentUpdate);
router.delete("/:commentId", authMiddleware, commentController.commentDelete);


export default router;
