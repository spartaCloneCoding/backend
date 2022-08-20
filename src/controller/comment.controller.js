
import CommentService from "../services/comment.service.js";
import Comment from "../models/comment.js";

export default class CommentController {
    commentService = new CommentService();

    commentGet = async (req, res, next) => {
        const postId = req.params.postId;

        try {
            const comment1 = await this.commentService.commentGetService(
                postId
            );
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

    commentCreate = async (req, res, next) => {
        const { userId } = res.locals;
        const postId = req.params.postId;
        const comment = req.body.comment;
        try {
            const commentCreate = await this.commentService.commentCreate(
                comment,
                userId,
                postId
            );
            if (comment.length !== 0) {
                return res.status(201).json({
                    success: true,
                    message: "작성 성공",
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "작성 실패",
                });
            }
        } catch (error) {
            return next(error);
        }
    };

    commentUpdate = async (req, res, next) => {
        const { userId } = res.locals;
        const commentId = req.params.commentId;
        const comment = req.body.comment;
        try {
            const findId = await Comment.findOne({ where: { id: commentId } });
            if (!findId) {
                return res.status(400).json({
                    success: false,
                    message: "존재하지않는 댓글",
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

    commentDelete = async (req, res, next) => {
        const commentId = req.params.commentId;

        try {
            const findId = await Comment.findOne({ where: { id: commentId } });
            if (!findId) {
                return res.status(400).json({
                    success: false,
                    message: "존재하지않는 댓글",
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

