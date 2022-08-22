import express from "express";
import PostController from "../controller/post.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", PostController.postview); //커뮤니티 메인페이지 조회
router.post("/", authMiddleware, PostController.postcreat); //커뮤니티 작성
router.get("/:postId", PostController.postviewdetail); //게시판 상세보기
router.patch("/:postId", authMiddleware, PostController.postupdate); //커뮤니티 수정
router.delete("/:postId", authMiddleware, PostController.postdelete); //커뮤니티 삭제
router.post("/like/:postId", authMiddleware, PostController.postLike);
router.delete("/like/:postId", authMiddleware, PostController.postLikeDelete);
router.get("/like/:postId", PostController.postLikeNum);

export default router;
