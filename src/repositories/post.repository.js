import Post from "../models/post.js";
import Comment from "../models/comment.js";
import User from "../models/user.js";
import Like from "../models/like.js";

class Postrepositories {
    // 만들어야 할꺼

    // 커뮤니티 메인페이지 조회 = postveiw
    // 커뮤니티 작성 = postcreat
    // 게시판 상세보기 = postviewdetail
    // 커뮤니티 수정 = postupdate
    // 커뮤니티 삭제 = postdelete

    finduser = async (UserId) => {
        const user = await User.findOne({ where: { id: UserId }, raw: true });

        return user;
    };

    postview = async () => {
        const list = await Post.findAll({
            where: {},

            include: [
                { model: User, attributes: ["nickname"] },
                { model: Comment },
                { model: Like },
            ],
            attributes: { exclude: ["nickname", "UserId"] },
            order: [["createdAt", "DESC"]],
        });

        return list;        
    };

    postviewdetail = async (postId) => {
        const post = await Post.findAll({
            where: { id: postId },
            include: [
                { model: User, attributes: ["nickname"] },
                { model: Comment },
                { model: Like },
            ],
            attributes: { exclude: ["nickname"] },
        });

        return post[0].dataValues;
    };

    postcreat = async (title, content, UserId) => {
        await Post.create({ title, content, UserId });

        return;
    };

    postupdate = async (title, content, postId, UserId) => {
        await Post.update(
            { title, content },
            { where: { id: postId, UserId } }
        );

        return;
    };

    postdelete = async (postId, UserId) => {
        await Post.destroy({ where: { id: postId, UserId } });

        return;
    };

    postLike = async (postId, userId) => {
        const likeCreate = await Like.create({
            PostId: postId,
            UserId: userId,
            like: true,
        });

        return likeCreate;
    };

    postLikeDelete = async (postId, userId) => {
        const LikeDelete = await Like.destroy({
            where: { PostId: postId, UserId: userId },
        });

        return LikeDelete;
    };
}

export default new Postrepositories();
