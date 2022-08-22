import User from "../models/user.js";

const authMiddleware = async (req, res, next) => {
    try {
        const { email } = req.session;
        if (email !== undefined) {
            const userInfo = await User.findOne({ where: { email } });
            res.locals.userId = userInfo.id;
            res.locals.nickname = userInfo.nickname;
            next();
        } else {
            res.status(400).json({
                success: false,
                message: "로그인이 필요합니다.",
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }
};

const loginCheckMiddleware = async (req, res, next) => {
    try {
        const { email } = req.session;
        if (email !== undefined) {
            return res.status(400).json({
                success: false,
                message: "이미 로그인 되어있습니다.",
            });
        }
        next();
    } catch (error) {
        res.status(400).josn({
            success: false,
            message: error,
        });
    }
};

const logoutCheckMiddleware = async (req, res, next) => {
    try {
        const { email } = req.session;
        if (email === undefined) {
            return res.status(400).json({
                success: false,
                message: "이미 로그아웃 되어있습니다.",
            });
        }
        next();
    } catch (error) {
        res.status(400).josn({
            success: false,
            message: error,
        });
    }
};

export { authMiddleware, loginCheckMiddleware, logoutCheckMiddleware };
