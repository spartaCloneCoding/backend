import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = async (req, res, next) => {
    // 요청 헤더에서 토큰 값을 가지고 옴
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = (authorization || "").split(" "); // 구조분해 할당

    if (tokenType !== "Bearer") {
        return res.status(400).json({
            success: false,
            message: "로그인 후 사용하세요.",
        });
    }

    try {
        // 받아온 토큰 값을 검증해서 user에 저장
        const user = jwt.verify(tokenValue, process.env.JWTKEY);

        // res.loclas로 넘겨줌
        res.locals.userId = user.userId;
        res.locals.nickname = user.userNickname;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({
            errorMessage: "로그인 후 사용하세요.",
        });
        return;
    }
};

export { authMiddleware };
