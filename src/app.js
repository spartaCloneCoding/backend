import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import passportConfig from "./passport/index.js";
import session from "express-session";

passportConfig();

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

app.use(passport.initialize());
app.use(passport.session());
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
