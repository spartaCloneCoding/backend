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

export default authMiddleware;
