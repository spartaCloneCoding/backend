import passport from "passport";
import kakaoPassport from "passport-kakao";
const KakaoStrategy = kakaoPassport.Strategy; // KakaoStrategy를 생성자 함수로 사용하기 위한 코드

dotenv.config();
import dotenv from "dotenv";
import User from "../models/user.js";

const kakao = () => {
    passport.use(
        new KakaoStrategy(
            {
                clientID: process.env.KAKAO_ID, // 발급 받은 REST API키
                callbackURL: "/api/users/auth/kakao/callback", // Redirect URL 경로
            },

            //   accessToken, refreshToken: 로그인 성공 후 카카오가 보내준 토큰이지만 사용은 안함
            //   profile: 카카오가 보내준 유저 정보. profile의 정보를 바탕으로 회원가입
            async (accessToken, refreshToken, profile, done) => {
                // 로그아웃을 하려면 accessToken을 사용해서 할 수 있는데 accessToken는 외부에 노출이 되어서는 안된다.
                // accessToken으로 값을 내 KaKao 계정에 개발자 설정을 할 수 있기 때문이다.
                // 그래서 따론 토큰을 발행해주는 것이 좋은 방법인 것 같다.
                // 아직 로그아웃 부분은 구현이 되지 않았지만 다음에 도전 과제로 잡아야겠다.

                try {
                    // 유저 정보가 겹칠 수 있는 상황을 대비해서 isSocial이라는 coulum을 생성해둠
                    const exUser = await User.findOne({
                        where: { email: profile.id, isSocial: true },
                    });

                    if (exUser) {
                        // 해당 유저가 이미 존재하면 done이 실행되고
                        //  userController.socialLogin가 실행됨
                        return done(null, exUser); // 로그인 인증 완료
                    } else {
                        const newUser = await User.create({
                            email: profile.id,
                            nickname: profile.displayName,
                            isSocial: true,
                        });
                        // 존재하지 않는 유저라면 회원가입을 시키고 done을 실행
                        //  userController.socialLogin가 실행됨
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
