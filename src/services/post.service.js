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

        return list;
    };

    postviewdetail = async (postId) => {
        const post = await Postrepositories.postviewdetail(postId);
   
        return post;
    };

    postcreat = async (title, content, UserId) => {
        Postrepositories.postcreat(title, content, UserId);

        return;
    };

    postupdate = async (title, content, postId) => {
        Postrepositories.postupdate(title, content, postId);

        return;
    };

    postdelete = async (postId) => {
        Postrepositories.postdelete(postId)

        return;
    };
}

export default new PostService;