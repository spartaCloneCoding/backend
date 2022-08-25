import Comment from "../models/comment.js";
import User from "../models/user.js";

export default class CommentRepository {
    // 댓글 조회 레포지토리 계층
        commentGet = async(postId) => {
            const comment1 = await Comment.findAll({
                where: {PostId: postId},
                // 인클루드를 통하여 유저 모델 추가 
                include: {
                    model: User,
                    attributes: ["nickname"]
                }
            });

            return comment1;
        };

        // 댓글 생성 레포지토리 계층
        commentCreate = async(comment, UserId, PostId) => {
            const commentCreate = await Comment.create({
                comment,
                UserId,
                PostId,
            })

            return commentCreate
        };

        // 댓글 수정 레포지토리 계층
        commentUpdate = async(comment, commentId) => {
            const commentUpdate = await Comment.update({
                comment,
            }, {where : {id: commentId}})

            return commentUpdate;
        }

        // 댓글 삭제 레포지토리계층
        commentDelete = async(commentId) => {
            const commentDelete = await Comment.destroy({
                where: {id: commentId}
            })

            return commentDelete;
        }
};
