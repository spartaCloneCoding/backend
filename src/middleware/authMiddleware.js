// import User from "../models/user.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = (authorization || "").split(" ");

    if (tokenType !== "Bearer") {
        return res.status(400).json({
            errorMessage: "로그인 후 사용하세요.",
        });
    }

    try {
        const user = jwt.verify(tokenValue, process.env.JWTKEY);
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
