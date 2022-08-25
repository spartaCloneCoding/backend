import express from "express";
import UserController from "../controller/user.controller.js";
import UserValidation from "../validation/user.validation.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

import passport from "passport";

const router = express.Router();
const userController = new UserController();
const userValidation = new UserValidation();

// 이메일 중복체크
// userValidation 클래스를 가지고 와서 검증 실행
router.post("/email_check", userValidation.email_check);

// 회원가입
router.post("/join", userController.joinUser);

// 로그인
router.post("/login", userController.loginUser);

router.get("/test", authMiddleware, userController.test);

// 카카오 로그인하기 라우터
router.get("/auth/kakao", passport.authenticate("kakao"));
/* 위에 주소로 요청이 오게 되면 카카오 로그인 페이지로 가게 되고, 카카오 서버를 통해
 카카오 로그인을 하게 되면, 밑에 있는 라우터로 요청이 가게 된다.  */

router.get(
    "/auth/kakao/callback",
    /*     KaKaoStrategy로 가서 카카오계정 정보와 DB를 비교해서 회원가입 시키거나 
            로그인 처리하게 된다.
    */
    passport.authenticate("kakao", {
        failureRedirect: "/", // 카카오 전략이 실패하면 실행 되는 코드
    }),

    userController.socialLogin // userController 실행
);

export default router;
