import Postrepositories from "../repositories/post.repository.js";

class PostService {
    // 만들어야 할꺼

    // 커뮤니티 메인페이지 조회 = postveiw
    // 커뮤니티 작성 = postcreat
    // 게시판 상세보기 = postviewdetail
    // 커뮤니티 수정 = postupdate
    // 커뮤니티 삭제 = postdelete

    postview = async () => {
        const list = await Postrepositories.postview();

        if (!list.length) {
            return false;
        }

        return list;
    };

    postviewdetail = async (postId) => {
        const post = await Postrepositories.postviewdetail(postId);

        if (post === null) {
            return false;
        }

        return post;
    };

    postcreat = async (title, content, UserId) => {
        if (title === "" || content === "") {
            return true;
        }

        await Postrepositories.postcreat(title, content, UserId);

        return false;
    };

    postupdate = async (title, content, postId, UserId) => {
        const user = await Postrepositories.finduser(UserId);

        const post = await Postrepositories.postviewdetail(postId);

        if (post === null) {
            return post;
        }

        if (user.id !== post.UserId) {
            return "mismatched user";
        }

        Postrepositories.postupdate(title, content, postId, UserId);

        return post;
    };

    postdelete = async (postId, UserId) => {
        const user = await Postrepositories.finduser(UserId);

        const post = await Postrepositories.postviewdetail(postId);

        if (post === null) {
            return post;
        }

        if (user.id !== post.UserId) {
            return "mismatched user";
        }

        Postrepositories.postdelete(postId, UserId);

        return false;
    };

    postLike = async (postId, userId) => {
        const PostLike = await Postrepositories.postLike(postId, userId);

        return PostLike;
    };

    postLikeDelete = async (postId, userId) => {
        const postLikeDelete = await Postrepositories.postLikeDelete(
            postId,
            userId
        );

        return postLikeDelete;
    };
}

export default new PostService();
