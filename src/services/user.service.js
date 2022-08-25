import UserRepository from "../repositories/user.repository.js";

class UserService {
    userRepository = new UserRepository();

    // 콘트롤러 계층에서 값을 받아오고 repository 계층으로 넘겨줌
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
