import UserService from "../services/user.service.js";
import UserValidation from "../validation/user.validation.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// validation 폴더에 있는 UserValidation 클래스를 가지고 옴
const validation = new UserValidation();

class UserController {
    userService = new UserService();

    joinUser = async (req, res) => {
        // 바디 값으로 유저의 회원가입 정보를 받아옴
        const { email, password, confirmPw, nickname } = req.body;

        // validation.joinValidation 함수를 사용 유효성 검사 값을 받음
        const validationUser = await validation.joinValidation(
            email,
            password,
            confirmPw,
            nickname
        );

        // 유효성 검사
        // validationUser에서 유효성 검사가 잘 되었으면 null을 반환받아서
        // if문에 걸리지 않음
        // 유효성 검사가 실패하면 속성에 err를 반환 받음
        if (validationUser) {
            return res.status(400).json({
                success: false,
                message: `${validationUser.err}을 확인해주세요`,
            });
        }

        // 중복 검사 및 회원가입
        /* 서비스 계층과 repository 계층에 값을 보내서 중복 확인을 하고 
        만약 이메일이 중복이 되었다면 false를 반환받음
        만약 중복이 되지 않았다면  true 값을 리턴 받음*/
        const joinUser = await this.userService.joinUser(
            email,
            password,
            nickname
        );
        if (!joinUser) {
            return res.status(400).json({
                success: false,
                message: "이메일중복",
            });
        }

        // 상단에 위치한 조건을 다 통과하면 하단에 있는 코드 실행
        res.status(200).json({
            success: true,
            message: "회원가입 성공",
        });
    };

    loginUser = async (req, res) => {
        // 바디 값으로 값을 받아옴
        const { email, password } = req.body;

        // 가지고 온 validation 클래스 안에서 validationLogin 함수 실행
        const validationLogin = await validation.validationLogin(
            email,
            password
        );

        /* validationLogin 값이 false가 아닌 경우는 로그인 검사가 성공 했다는 것
        validationLogin가 false가 아니라면 validationLogin안에 유저 아이디와 
        닉네임이 속성 값으로 존재함 그 값을 jwt 토큰으로 만들고 프론트에게 전해줌 */
        if (validationLogin !== false) {
            const token = jwt.sign(
                {
                    userId: validationLogin.userId,
                    userNickname: validationLogin.userNickname,
                },
                process.env.JWTKEY // JWT 키 값
            );

            res.status(200).json({
                success: true,
                message: token,
            });
        } else {
            /* validationLogin가 false 면 로그인이 실패한 경우 */
            res.status(400).json({
                success: false,
                message: "로그인실패",
            });
        }
    };

    // 소셜 로그인
    socialLogin = async (req, res) => {
        // passport/index.js에서 저장된 req.user 객체를 가져온다.
        const user = req.user;

        const token = jwt.sign(
            {
                userId: user.dataValues.id,
                userNickname: user.dataValues.nickname,
            },
            process.env.JWTKEY
        );
        // 토큰을 만들어서 프론트에 전달해준다.
        res.redirect(
            `http://yamae-coding.s3-website.ap-northeast-2.amazonaws.com?token=${token}`
        );
    };
}

export default UserController;
