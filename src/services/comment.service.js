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
};

