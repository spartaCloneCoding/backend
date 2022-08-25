import  CommentRepository from "../repositories/comment.repository.js";


export default class CommentService{
    CommentRepository = new CommentRepository();

    // 댓글 조회 서비스계층
    commentGetService = async (postId) => {
        const comment1 = await this.CommentRepository.commentGet(postId)

        return comment1;
    }

    // 댓글 생성 서비스계층
    commentCreate = async (comment, UserId, PostId) => {
        const commentCreate = await this.CommentRepository.commentCreate(
            comment,
            UserId,
            PostId,
        );

        return {commentCreate}
    };
    
    // 댓글 수정 서비스 계층
    commentUpdate = async(comment, commentId) => {
        const commentUpdate = await this.CommentRepository.commentUpdate(
            comment,
            commentId
        );

        return commentUpdate;
    };

    // 댓글 삭제 서비스 계층
    commentDelete = async(commentId) => {
        const commentDelete = await this.CommentRepository.commentDelete(
            commentId,
        )

        return commentDelete;
    }
};

