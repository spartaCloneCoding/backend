import { authMiddleware } from "../src/middleware/authMiddleware.js";

jest.mock("jsonwebtoken");

import jwt from "jsonwebtoken";

describe("checkLogin", () => {
    const req = {
        headers: {
            authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksInVzZXJOaWNrbmFtZSI6IuydtOyDge2YhCIsImlhdCI6MTY2MTM5MTgzOX0.m8vpQb8wMWM0mWoUFfz6fKxkRfcasSDg2FasZhkgFMg",
        },
    };

    const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
        locals: { userId: "" },
        locals: { nickname: "" },
    };
    const next = jest.fn();

    test("미들웨어 테스트 로그인 되어있으면 next를 호출 해야 함", () => {
        jwt.verify.mockReturnValue({ userId: 1, nickname: "hi" });
        authMiddleware(req, res, next);

        expect(next).toBeCalledTimes(1);
    });
});
