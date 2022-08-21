import Post from "../models/post.js";
import User from "../models/user.js";
import Like from "../models/like.js";

class Postrepositories {
    // 만들어야 할꺼

    // 커뮤니티 메인페이지 조회 = postveiw
    // 커뮤니티 작성 = postcreat
    // 게시판 상세보기 = postviewdetail
    // 커뮤니티 수정 = postupdate
    // 커뮤니티 삭제 = postdelete

    postview = async () => {
        const list = await Post.findAll({
            where: {},
            include: [{ model: User, attributes: ["nickname"] }],
            attributes: { exclude: ["nickname", "UserId"] },
            order: [['createdAt', 'DESC']],
            raw: true
        });

        return list;
    };

    postviewdetail = async (postId) => {
        const post = await Post.findOne({
            where: { id: postId },
            include: [{ model: User, attributes: ["nickname"] }],
            attributes: { exclude: ["nickname", "UserId"] },
            raw: true
        });

        return post;
    };

    postcreat = async (title, content, UserId) => {
        await Post.create({ title, content, UserId});

        return;
    };

    postupdate = async (title, content, postId) => {
        await Post.update({ title, content }, { where: { id: postId } });

        return;
    };

    postdelete = async (postId) => {
        await Post.destroy({ where: { id: postId } });

        return;
    };

    postLike = async(postId, userId) => {
        const likeCreate = await Like.create({
            PostId : postId,
            UserId : userId,
            like : true,
        })

        return likeCreate;
    }

    postLikeDelete = async(postId, userId) => {
        const LikeDelete = await Like.destroy({
            where : {PostId: postId, UserId : userId}
        });

        return LikeDelete
    }
}

export default new Postrepositories;