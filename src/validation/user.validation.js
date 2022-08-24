import User from "../models/user.js";
import bcrypt from "bcrypt";
import Joi from "joi";

class UserValidation {
    // 회원가입시 유효성 검사
    joinValidation = async (email, password, confirmPw, nickname) => {
        const schema = Joi.object({
            email: Joi.string().email().max(30).required(),
            password: Joi.string()
                .pattern(new RegExp("^[a-zA-Z0-9]{4,16}$"))
                .required(),
            confirmPw: Joi.ref("password"),
            nickname: Joi.string()
                .pattern(new RegExp("^[a-zA-Zㄱ-힣]{2,10}$"))
                .required(),
        });

        // 성공하면 return으로 빈 값을 보냄
        try {
            await schema.validateAsync({
                email,
                password,
                confirmPw,
                nickname,
            });
            return null;
        } catch (err) {
            // 실패하면 틀린 값에 경로를 보냄 ex) email
            return { err: err.details[0].path[0] };
        }
    };

    // 이메일이 존재하는지 중복체크
    email_check = async (req, res) => {
        const { email } = req.body;

        try {
            const checkemail = await User.findOne({ where: { email } });

            if (checkemail) {
                return res.status(400).json({
                    success: false,
                    message: "중복된 이메일",
                });
            }

            res.status(200).json({
                success: true,
                message: "중복되지 않음",
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error });
        }
    };

    validationLogin = async (email, password) => {
        try {
            const userInfo = await User.findOne({
                where: { email, isSocial: false },
            });

            const validationPassword = await bcrypt.compare(
                password,
                userInfo.password
            );

            if (validationPassword) {
                return { userId: userInfo.id, userNickname: userInfo.nickname };
            } else {
                // 패스워드 검증이 실패한 경우
                return false;
            }
        } catch (error) {
            // 이메일이 없는 경우
            return false;
        }
    };
}

export default UserValidation;
