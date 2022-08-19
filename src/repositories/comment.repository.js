import Comment from "../models/comment.js";
import User from "../models/user.js";

export default class CommentRepository {
        commentGet = async(postId) => {
            const comment1 = await Comment.findAll({
                where: {PostId: postId},
                include: {
                    model: User,
                    attributes: ["nickname"]
                }
            });

            return comment1;
        };

        commentCreate = async(comment, UserId, PostId) => {
            // 와 시발 이거 순서 안맞췃네
            const commentCreate = await Comment.create({
                comment,
                UserId,
                PostId,
            })

            return commentCreate
        };

        commentUpdate = async(comment, commentId) => {
            const commentUpdate = await Comment.update({
                comment,
            }, {where : {id: commentId}})

            return commentUpdate;
        }

        commentDelete = async(commentId) => {
            const commentDelete = await Comment.destroy({
                where: {id: commentId}
            })

            return commentDelete;
        }
};
