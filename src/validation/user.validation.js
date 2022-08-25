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
        // 이메일 값을 바디 값으로 받음
        const { email } = req.body;

        try {
            const checkemail = await User.findOne({ where: { email } });

            // 이메일이 이미 존재하면 중복 된 이메일
            if (checkemail) {
                // 리턴 값으로 하단 코드를 보내줌
                return res.status(400).json({
                    success: false,
                    message: "중복된 이메일",
                });
            }

            // 위에 조건이 걸리지 않으면 성공 리턴을 보내줌
            res.status(200).json({
                success: true,
                message: "중복되지 않음",
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error });
        }
    };

    // 로그인 할 때 이메일과 패스워드를 검사하는 함수
    validationLogin = async (email, password) => {
        try {
            // 받은 이메일이 존재하는지 체크 있으면 해당 유저가 존재하는 것
            const userInfo = await User.findOne({
                where: { email, isSocial: false },
            });

            // userinfo에서 받아온 저장 되어있는 패스워드와 현재 클라이언트에게서 받은
            // 패스워드를 검사 만약,
            // validationPassword가 성공 하면 true 또는 false를 반환
            // 만약 email이 존재하지 않는다면 userInfo.password에서 에러가 생김
            // 그러면 catch로 가게 됨 이 경우는 이메일이 존재하지 않는 경우
            const validationPassword = await bcrypt.compare(
                password,
                userInfo.password
            );

            if (validationPassword) {
                // validationPassword가 true면 실행
                // 토큰을 발행해주기 위해 유저 아이디와 닉네임을 리턴
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
