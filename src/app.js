import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
import session from "express-session";
import MySQLStore from "express-mysql-session";

dotenv.config();

import { sequelize } from "./models/index.js";

MySQLStore(session);

const app = express();

app.set("port", process.env.PORT || 3000);

sequelize
    .sync({ force: false })
    .then(() => console.log("db connect"))
    .catch((err) => console.error(err));
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

const options = {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_ID,
    password: process.env.DB_PW,
    database: "spartacode",
};

const sessionStore = new MySQLStore(options);
app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: { maxAge: 1000 * 60 * 60 * 1 },
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
