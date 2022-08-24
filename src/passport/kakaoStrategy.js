import passport from "passport";
import kakaoPassport from "passport-kakao";
const KakaoStrategy = kakaoPassport.Strategy;

dotenv.config();
import dotenv from "dotenv";
import User from "../models/user.js";

const kakao = () => {
    passport.use(
        new KakaoStrategy(
            {
                clientID: process.env.KAKAO_ID,
                callbackURL: "/api/users/auth/kakao/callback",
            },

            async (accessToken, refreshToken, profile, done) => {
                try {
                    const exUser = await User.findOne({
                        where: { email: profile.id, isSocial: true },
                    });
                    if (exUser) {
                        return done(null, exUser); // 로그인 인증 완료
                    } else {
                        const newUser = await User.create({
                            email: profile.id,
                            nickname: profile.displayName,
                            isSocial: true,
                        });
                        done(null, newUser);
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            }
        )
    );
};

export { kakao };
