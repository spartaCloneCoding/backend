import PostService from "../services/post.service.js";

class PostController {
    // 만들어야 할꺼

    // 커뮤니티 메인페이지 조회 = postveiw
    // 커뮤니티 작성 = postcreat
    // 게시판 상세보기 = postviewdetail
    // 커뮤니티 수정 = postupdate
    // 커뮤니티 삭제 = postdelete

    // 커뮤니티 메인페이지 조회
    postview = async (req, res,) => {
        try {
            const list = await PostService.postview();

            if(!list){
                return res.status(400).json({message:"게시글이 존재하지 않습니다"});
            }

            return res.status(200).json(list);
        }
        catch (err) {
            return res.status(400).json(err);
        }
    };

    // 게시판 상세보기
    postviewdetail = async (req, res,) => {
        try {
            const { postId } = req.params;
            const post = await PostService.postviewdetail(postId)

            if(!post){
                return res.status(400).json({message:"삭제되었거나 없는 게시글입니다"});
            }

            return res.status(200).json(post);
        }
        catch (err) {
            return res.status(400).json(err);
        }
    };

    // 커뮤니티 작성
    postcreat = async (req, res,) => {
        try {
            const { title, content } = req.body;
            const UserId = 1;                                   //UserId 임시 부여 => 주의 사항으로 User 테이블내에 pk인 id가 1인 값이 무조건 있어야 생성가능
            const result = await PostService.postcreat(title, content, UserId);

            if(result){
                return res.status(400).json({message:"공란으로는 작성이 불가합니다"});
            }
            else{
                return res.status(200).json({message:"성공"});
            }
        }
        catch (err) {
            return res.status(400).json(err);
        }
    };

    // 커뮤니티 수정
    postupdate = async (req, res,) => {
        try {
            const { title, content } = req.body;
            const { postId } = req.params;
            const result = await PostService.postupdate(title, content, postId);

            if(result){
                return res.status(400).json({message:"삭제되었거나 없는 게시글입니다"});
            }
            else{
                return res.status(200).json({message:"성공"});
            }
        }
        catch (err) {
            return res.status(400).json(err);
        }
    };

    // 커뮤니티 삭제
    postdelete = async (req, res,) => {
        try {
            const { postId } = req.params;
            const result = await PostService.postdelete(postId);

            if(result){
                return res.status(400).json({message:"삭제되었거나 없는 게시글입니다"});
            }
            else{
                return res.status(200).json({message:"성공"});
            }
        }
        catch (err) {
            return res.status(400).json(err);
        }
    };
}

export default new PostController;