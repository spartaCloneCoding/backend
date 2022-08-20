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

        if(!list.length){
            return false;
        }

        return list;
    };

    postviewdetail = async (postId) => {
        const post = await Postrepositories.postviewdetail(postId);

        if(post === null){
            return false;
        }

        return post;
    };

    postcreat = async (title, content, UserId) => {
        if(title === "" || content === ""){
            return true
        }

        await Postrepositories.postcreat(title, content, UserId);

        return false;
    };

    postupdate = async (title, content, postId) => {
        const post = await Postrepositories.postviewdetail(postId);

        if(post === null){
            return true
        }
        Postrepositories.postupdate(title, content, postId);

        return false;
    };

    postdelete = async (postId) => {
        const post = await Postrepositories.postviewdetail(postId);

        if(post === null){
            return true
        }
        Postrepositories.postdelete(postId)

        return false;
    };
}

export default new PostService;