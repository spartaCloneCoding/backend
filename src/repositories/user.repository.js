import User from "../models/user.js";
import bcrypt from "bcrypt";

class UserRepository {
    joinUser = async (email, password, nickname) => {
        try {
            // 회원가입 할 이메일이 존재하는지 중복 체크 함
            const exsistemail = await User.findOne({
                where: { email },
            });

            // 이미 이메일이 존재하면 false를 반환해서 회원가입을 하지 못하게 함
            if (exsistemail) {
                return false;
            }

            // 비밀번호 해시화하는 코드
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(password, salt);

            // 상단에 조건을 통과하면 User 생성 및 true 반환
            await User.create({
                email,
                password: hashpassword,
                nickname,
                isSocial: false,
            });
            return true;
        } catch (error) {
            return error;
        }
    };
}

export default UserRepository;
