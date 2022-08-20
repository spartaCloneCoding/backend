const authMiddleware = (req, res, next) => {
    try {
        const { email } = req.session;
        if (email !== undefined) {
            res.locals.email = email;
            // 닉네임 추가
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
