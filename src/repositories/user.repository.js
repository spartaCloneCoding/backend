import User from "../models/user.js";
import bcrypt from "bcrypt";

class UserRepository {
    joinUser = async (email, password, nickname) => {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        try {
            await User.create({ email, password: hashpassword, nickname });
        } catch (error) {
            return { error };
        }
    };
}

export default UserRepository;
