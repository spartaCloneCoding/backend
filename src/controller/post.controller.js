import PostService from "../services/post.service.js";
import Like from "../models/like.js";

class PostController {
    // 만들어야 할꺼

    // 커뮤니티 메인페이지 조회 = postveiw
    // 커뮤니티 작성 = postcreat
    // 게시판 상세보기 = postviewdetail
    // 커뮤니티 수정 = postupdate
    // 커뮤니티 삭제 = postdelete

    // 커뮤니티 메인페이지 조회 - 작성자 : 김영광
    postview = async (req, res) => {
        try {
            const list = await PostService.postview();

            
            if (!list) {
                return res.status(400).json({
                    success: false,
                    message: "게시글이 존재하지 않습니다",
                });
            }

            return res.status(200).json({
                result: list,
                success: true,
                message: "성공",
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err,
            });
        }
    };

    // 게시판 상세보기 - 작성자 : 김영광
    postviewdetail = async (req, res) => {
        try {
            const { postId } = req.params;
            const post = await PostService.postviewdetail(postId);

            if (!post) {
                return res.status(400).json({
                    success: false,
                    message: "삭제되었거나 없는 게시글입니다",
                });
            }

            return res.status(200).json({
                result: post,
                success: true,
                message: "성공",
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err,
            });
        }
    };

    // 커뮤니티 작성 - 작성자 : 김영광
    postcreat = async (req, res) => {
        try {
            const { userId } = res.locals;
            const { title, content } = req.body;
            const result = await PostService.postcreat(title, content, userId);
            if (result) {
                return res.status(400).json({
                    success: false,
                    message: "공란으로는 작성이 불가합니다",
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: "성공",
                });
            }
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err,
            });
        }
    };

    // 커뮤니티 수정 - 작성자 : 김영광
    postupdate = async (req, res) => {
        try {
            const { userId } = res.locals;
            const { title, content } = req.body;
            const { postId } = req.params;
            const result = await PostService.postupdate(
                title,
                content,
                postId,
                userId
            );

            if (result === null) {
                return res.status(400).json({
                    success: false,
                    message: "없는게시글입니다.",
                });
            }

            if (result === "mismatched user") {
                return res.status(400).json({
                    success: false,
                    message: "삭제 및 수정할 권한이 없습니다",
                });
            }

            if (!result) {
                return res.status(400).json({
                    success: false,
                    message: "삭제되었거나 없는 게시글입니다",
                });
            }

            return res.status(200).json({
                result: result,
                success: true,
                message: "성공",
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err,
            });
        }
    };

    // 커뮤니티 삭제 - 작성자 : 김영광
    postdelete = async (req, res) => {
        try {
            const { userId } = res.locals;
            const { postId } = req.params;
            const result = await PostService.postdelete(postId, userId);

            if (result === null) {
                return res.status(400).json({
                    success: false,
                    message: "삭제되었거나 없는 게시글입니다",
                });
            }
            if (result === "mismatched user") {
                return res.status(400).json({
                    success: false,
                    message: "삭제 및 수정할 권한이 없습니다",
                });
            }

            return res.status(200).json({
                success: true,
                message: "성공",
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err,
            });
        }
    };

    // 좋아요 주석 : 좋아요는 로그인만 하면 누구나 가능 - 작성자 : 윤상돈
    postLike = async (req, res, next) => {
        const postId = req.params.postId;
        const userId = res.locals.userId;

        try {
            const findLike = await Like.findOne({
                where: { PostId: postId, UserId: userId },
            });
            if (findLike) {
                return res.status(400).json({
                    success: false,
                    message: "이미 좋아요 한 댓글입니다",
                });
            }

            const postLike = await PostService.postLike(postId, userId);
            return res.status(200).json({
                success: true,
                message: "좋아요 성공",
            });
        } catch (error) {
            return next(error);
        }
    };
    // 작성자 : 윤상돈
    postLikeDelete = async (req, res, next) => {
        const postId = req.params.postId;
        const userId = res.locals.userId;

        try {
            const findLike = await Like.findOne({
                where: { PostId: postId, UserId: userId },
            });

            if (!findLike) {
                return res.status(400).json({
                    success: false,
                    message: "좋아요를 하여야만 취소할 수 있습니다",
                });
            }
            const postLikeDelete = await PostService.postLikeDelete(
                postId,
                userId
            );
            return res.status(200).json({
                success: true,
                message: "좋아요를 취소했습니다",
            });
        } catch (error) {
            return next(error);
        }
    };

    // 좋아요 개수 확인 조건 필요없음 0은 0임 - 작성자 : 윤상돈
    postLikeNum = async (req, res, next) => {
        const postId = req.params.postId;

        try {
            const findLikeNum = await Like.findAll({
                where: { like: true, PostId: postId },
            });
            return res.status(200).json({
                success: true,
                message: "조회성공",
                result: findLikeNum.length,
            });
        } catch (error) {
            return next(error);
        }
    };
}

export default new PostController();
