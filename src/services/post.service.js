import Postrepositories from "../repositories/post.repository.js";

class PostService {
    // 만들어야 할꺼

    // 커뮤니티 메인페이지 조회 = postveiw
    // 커뮤니티 작성 = postcreat
    // 게시판 상세보기 = postviewdetail
    // 커뮤니티 수정 = postupdate
    // 커뮤니티 삭제 = postdelete

    postview = async () => {
        const list = await Postrepositories.postview();

        if (!list.length) {
            return false;
        }

        let cmtNumBox = []
        let likeNumBox = []
        for (let i = 0; i < list.length; i++) {
            const cmtNum = list[i].Comments.length
            cmtNumBox.push(cmtNum)
        }


        for (let i = 0; i < list.length; i++) {
            const likeNum = list[i].Likes.length
            likeNumBox.push(likeNum)
        }

        for (let i = 0; i < list.length; i++) {
            list[i]["cmtNum"] = cmtNumBox[i]
            list[i]["likeNum"] = likeNumBox[i]
        }

        return list
        .map((currentValue, index) => {
            return {
                id : currentValue.id,
                title : currentValue.title,
                content : currentValue.content,
                createdAt : currentValue.createdAt,
                updatedAt : currentValue.updatedAt,
                User : currentValue.User,
                Comments : currentValue.Comments,
                cmtNum : cmtNumBox[index],
                likeNum : likeNumBox[index],
            }
        });
    };

    postviewdetail = async (postId) => {
        const post = await Postrepositories.postviewdetail(postId);

        if (post === null) {
            return false;
        }
        console.log(post);
        
        return {
            id : post.id,
            title : post.title,
            content : post.content,
            createdAt : post.createdAt,
            updatedAt : post.updatedAt,
            User : post.User,
            Comments : post.Comments,
            cmtNum : post.Comments.length,
            likeNum : post.Likes.length,
        };
    };

    postcreat = async (title, content, UserId) => {
        if (title === "" || content === "") {
            return true;
        }

        await Postrepositories.postcreat(title, content, UserId);

        return false;
    };

    postupdate = async (title, content, postId, UserId) => {
        const user = await Postrepositories.finduser(UserId);

        const post = await Postrepositories.postviewdetail(postId);

        if (post === null) {
            return post;
        }

        if (user.id !== post.UserId) {
            return "mismatched user";
        }

        Postrepositories.postupdate(title, content, postId, UserId);

        return post;
    };

    postdelete = async (postId, UserId) => {
        const user = await Postrepositories.finduser(UserId);

        const post = await Postrepositories.postviewdetail(postId);

        if (post === null) {
            return post;
        }

        if (user.id !== post.UserId) {
            return "mismatched user";
        }

        Postrepositories.postdelete(postId, UserId);

        return false;
    };

    postLike = async (postId, userId) => {
        const PostLike = await Postrepositories.postLike(postId, userId);

        return PostLike;
    };

    postLikeDelete = async (postId, userId) => {
        const postLikeDelete = await Postrepositories.postLikeDelete(
            postId,
            userId
        );

        return postLikeDelete;
    };
}

export default new PostService();
