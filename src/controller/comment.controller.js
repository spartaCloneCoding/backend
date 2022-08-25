import CommentService from "../services/comment.service.js";
import Comment from "../models/comment.js";

export default class CommentController {
    commentService = new CommentService();

    // 댓글 전체 조회
    commentGet = async (req, res, next) => {
        const postId = req.params.postId;

        try {
            const comment1 = await this.commentService.commentGetService(
                postId
            );
            // 댓글이 존재하지 않으면 존재하지않는 댓글 이라고 출력
            if (comment1.length !== 0) {
                return res.status(200).json(comment1);
            } else {
                return res.status(400).json({
                    success: false,
                    message: "존재하지 않는 댓글",
                });
            }
        } catch (error) {
            return next(error);
        }
    };

    // 댓글 생성
    // 미들웨어를 통하여 userId를 받음
    // params 를 통하여 postId를 받음
    commentCreate = async (req, res, next) => {
        const userId = res.locals.userId;
        const postId = req.params.postId;
        const comment = req.body.comment;

        try {
            // 댓글의 길이가 0이라면 댓글을 입력해주세요 출력
            // 그렇지 않을때는 정상적으로 기능이 작동하며 작성 성공 출력
            if (comment.length !== 0) {
                const commentCreate = await this.commentService.commentCreate(
                    comment,
                    userId,
                    postId
                );
                return res.status(201).json({
                    success: true,
                    message: "작성 성공",
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "댓글을 입력해주세요",
                });
            }
        } catch (error) {
            return next(error);
        }
    };

    // 댓글 수정
    commentUpdate = async (req, res, next) => {
        const userId = res.locals.userId;
        const commentId = req.params.commentId;
        const comment = req.body.comment;
        try {
            // params로 받은 commentId를 통하여 댓글 db에서 조회한 후 존재하지 않다면 존재하지 않는 댓글 출력
            const findId = await Comment.findOne({ where: { id: commentId } });
            if (!findId) {
                return res.status(400).json({
                    success: false,
                    message: "존재하지않는 댓글",
                });
            }

            // 조회한 유저의 고유id(댓글 작성자의 id)와 현재 로그인한 사람의 id를 비교하여 일치하지 않다면 본인의 글만 수정할 수 있다고 출력
            if (userId !== findId.UserId) {
                return res.status(400).json({
                    success: false,
                    message: "본인의 글만 수정할 수 있습니다",
                });
            }

            // 댓글을 쓰지 않으면 댓글을 입력해주세요 출력
            if (comment.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "댓글을 입력해주세요",
                });
            }

            const commentUpdate = await this.commentService.commentUpdate(
                comment,
                commentId
            );
            return res.status(200).json({
                success: true,
                message: comment,
            });
        } catch (error) {
            return next(error);
        }
    };

    // 댓글 삭제
    commentDelete = async (req, res, next) => {
        const commentId = req.params.commentId;
        const userId = res.locals.userId;

        try {
            // params로 받은 commentId를 통하여 댓글 db에서 조회한 후 존재하지 않다면 존재하지 않는 댓글 출력
            const findId = await Comment.findOne({ where: { id: commentId } });
            if (!findId) {
                return res.status(400).json({
                    success: false,
                    message: "존재하지않는 댓글",
                });
            }

            // 조회한 유저의 고유id(댓글 작성자의 id)와 현재 로그인한 사람의 id를 비교하여 일치하지 않다면 본인의 글만 삭제할 수 있다고 출력
            if (userId !== findId.UserId) {
                return res.status(400).json({
                    success: false,
                    message: "본인의 댓글만 삭제가능합니다",
                });
            }

            const commentDelete = await this.commentService.commentDelete(
                commentId
            );

            return res.status(200).json({ success: true });
        } catch (error) {
            return next(error);
        }
    };
}
