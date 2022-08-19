import CommentService from "../services/comment.service.js"

export default class CommentController{
    commentService = new CommentService();

    commentGet = (async (req, res, next) => {
    const postId = req.params.postId;

    try {
        const comment1 = await this.commentService.commentGetService(postId);
        return res.json(comment1)
    } catch(error) {
        console.error(error)
        return next(error);
    }
})
    

    commentCreate = async (req, res, next) => {
    const userId = 1;
    const postId = req.params.postId;
    const comment = req.body.comment;
    console.log(comment)
    try {
        const commentCreate = await this.commentService.commentCreate(
            comment,
            userId,
            postId,
    )
    console.log(commentCreate)
        return res.json(commentCreate)
        
    } catch(error) {
        console.error(error);
        return next(error)
    }
}
};
