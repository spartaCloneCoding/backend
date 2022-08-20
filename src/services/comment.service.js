import  CommentRepository from "../repositories/comment.repository.js";


export default class CommentService{
    CommentRepository = new CommentRepository();

    commentGetService = async (postId) => {
        const comment1 = await this.CommentRepository.commentGet(postId)

        return comment1;
    }

    commentCreate = async (comment, UserId, PostId) => {
        const commentCreate = await this.CommentRepository.commentCreate(
            comment,
            UserId,
            PostId,
        );

        return {commentCreate}
    };
    
    commentUpdate = async(comment, commentId) => {
        const commentUpdate = await this.CommentRepository.commentUpdate(
            comment,
            commentId
        );

        return commentUpdate;
    };

    commentDelete = async(commentId) => {
        const commentDelete = await this.CommentRepository.commentDelete(
            commentId,
        )

        return commentDelete;
    }
};

