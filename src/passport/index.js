import passport from "passport";
import { kakao } from "./kakaoStrategy.js"; // 카카오서버로 로그인할때
import User from "../models/user.js";

const passportConfig = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({ where: { id } })
            .then((user) => done(null, user))
            .catch((err) => done(err));
    });

    kakao(); // 카카오 전략 등록
};

export default passportConfig;
