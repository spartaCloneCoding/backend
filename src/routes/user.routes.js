import express from "express";
import UserController from "../controller/user.controller.js";
import UserValidation from "../validation/user.validation.js";
import {
    loginCheckMiddleware,
    logoutCheckMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();
const userController = new UserController();
const userValidation = new UserValidation();

// 이메일 중복체크
router.post("/email_check", userValidation.email_check);

// 닉네임 중복체크
router.post("/nickname_check", userValidation.nickname_check);

// 회원가입
router.post("/join", loginCheckMiddleware, userController.joinUser);

// 로그인
router.post("/login", loginCheckMiddleware, userController.loginUser);

// 로그아웃
router.get("/logout", logoutCheckMiddleware, userController.logOutUser);

export default router;
