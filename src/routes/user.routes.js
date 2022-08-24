import express from "express";
import UserController from "../controller/user.controller.js";
import UserValidation from "../validation/user.validation.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

import passport from "passport";

const router = express.Router();
const userController = new UserController();
const userValidation = new UserValidation();

// 이메일 중복체크
router.post("/email_check", userValidation.email_check);

// 회원가입
router.post("/join", userController.joinUser);

// 로그인
router.post("/login", userController.loginUser);

router.get("/test", authMiddleware, userController.test);

// 소셜 로그인
router.get("/auth/kakao", passport.authenticate("kakao"));

router.get(
    "/auth/kakao/callback",
    passport.authenticate("kakao", {
        failureRedirect: "/",
    }),
    userController.socialLogin
);

export default router;
