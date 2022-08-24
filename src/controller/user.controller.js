import UserService from "../services/user.service.js";
import UserValidation from "../validation/user.validation.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import passport from "passport";
dotenv.config();

const validation = new UserValidation();

class UserController {
    userService = new UserService();

    test = (req, res) => {
        res.json(res.locals);
    };

    joinUser = async (req, res) => {
        const { email, password, confirmPw, nickname } = req.body;
        const validationUser = await validation.joinValidation(
            email,
            password,
            confirmPw,
            nickname
        );

        // 유효성 검사
        if (validationUser) {
            return res.status(400).json({
                success: false,
                message: `${validationUser.err}을 확인해주세요`,
            });
        }

        // 중복 검사
        const joinUser = await this.userService.joinUser(
            email,
            password,
            nickname
        );

        if (joinUser.error) {
            return res.status(400).json({
                success: false,
                message: joinUser.error,
            });
        }
        res.status(200).json({
            success: true,
            message: "회원가입 성공",
        });
    };

    loginUser = async (req, res) => {
        const { email, password } = req.body;

        const validationLogin = await validation.validationLogin(
            email,
            password
        );

        if (validationLogin !== false) {
            const token = jwt.sign(
                {
                    userId: validationLogin,
                },
                process.env.JWTKEY
            );

            // res.cookie("token", token);
            res.status(200).json({ success: true, message: token });
        } else {
            res.status(400).json({
                success: false,
                message: "로그인실패",
            });
        }
    };

    // 소셜 로그인
    socialLogin = async (req, res) => {
        const user = req.user;
        const token = jwt.sign(
            {
                userId: user.dataValues.id,
            },
            process.env.JWTKEY
        );
        // res.cookie("token", token);
        res.status(200).json({ success: true, message: token });
    };
}

export default UserController;
