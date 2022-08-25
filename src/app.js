import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";

import passportConfig from "./passport/index.js";
import session from "express-session";

passportConfig();
/*  패스포트 설정 해주는 부분 => index.js에서  export 된 함 수를 가져와 KaKao 전략을 등록한다.
이 부분을 하지 않으면 "Unknown authentication strategy \"kakao\"" 에러가 나는데/ 
카카오 전략이 등록이 되지 않았기 때문이다. 

router에서
router.get("/auth/kakao", passport.authenticate("kakao")); 이 코드를 사용하게 할 수 있게 된다.

*/

dotenv.config();

import { sequelize } from "./models/index.js";

const app = express();

app.set("port", process.env.PORT || 3000);

sequelize
    .sync({ force: false })
    .then(() => console.log("db connect"))
    .catch((err) => console.error(err));

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(cookieParser());

/* passport는 express-session에 의존하기 때문에 app.use(session({...}))을 사용해야 한다.
또한  router 보다 상단에 위치해야 한다.*/
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_KEY,
        cookie: {
            httpOnly: true,
            secure: false,
        },
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우터
app.use("/api", router);

app.use((req, res, next) => {
    const error = new Error(
        `메서드 ${req.method} 경로 ${req.url} 존재하지 않습니다.`
    );
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    return res.json({
        success: false,
        message: err.message,
        result: err,
    });
});

app.listen(app.get("port"), () => console.log(3000));
