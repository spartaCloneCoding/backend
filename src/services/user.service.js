import UserRepository from "../repositories/user.repository.js";

class UserService {
    userRepository = new UserRepository();

    joinUser = async (email, password, nickname) => {
        const joinUser = await this.userRepository.joinUser(
            email,
            password,
            nickname
        );
        return joinUser;
    };
}

export default UserService;
