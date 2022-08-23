import UserService from "../services/user.service.js";
import UserValidation from "../validation/user.validation.js";
const validation = new UserValidation();

class UserController {
    userService = new UserService();

    test = (req, res) => {
        res.json(res.locals.nickname);
    };

    joinUser = async (req, res) => {
        const { email, password, confirmPw, nickname } = req.body;
        const validationUser = await validation.joinValidation(
            email,
            password,
            confirmPw,
            nickname
        );

        if (validationUser) {
            return res.status(400).json({
                success: false,
                message: `${validationUser.err}을 확인해주세요`,
            });
        }

        const joinUserError = await this.userService.joinUser(
            email,
            password,
            nickname
        );
        if (joinUserError) {
            return res.status(400).json({
                success: false,
                message: joinUserError.error.original.sqlMessage,
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

        if (validationLogin) {
            req.session.email = email;
            req.session.isLogined = true;
            res.status(200).json({ success: true, message: "로그인 성공" });
        } else {
            res.status(400).json({
                success: false,
                message: "로그인실패",
            });
        }
    };

    logOutUser = async (req, res) => {
        try {
            req.session.destroy(() => {
                req.session;
            });
            res.status(200).json({ success: true, message: "로그아웃 성공" });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "로그아웃 실패",
            });
        }
    };
}

export default UserController;
