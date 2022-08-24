import User from "../models/user.js";
import bcrypt from "bcrypt";

class UserRepository {
    joinUser = async (email, password, nickname) => {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        try {
            const exsistemail = await User.findOne({
                where: { email },
            });
            if (exsistemail) {
                return { error: "이메일 중복" };
            }
            const exsistnickname = await User.findOne({
                where: { nickname },
            });
            if (exsistnickname) {
                return { error: "닉네임 중복" };
            }

            await User.create({
                email,
                password: hashpassword,
                nickname,
                isSocial: false,
            });
        } catch (error) {
            return { error };
        }
    };
}

export default UserRepository;
