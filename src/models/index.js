export * from "./sequelize.js";
import sequelize from "./sequelize.js";

import User from "./user.js";
import Post from "./post.js";
import Comment from "./comment.js";
import Like from "./like.js";

const db = {};

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Comment = Comment;
db.Like = Like;

User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
Like.init(sequelize);


User.associate(db);
Post.associate(db);
Comment.associate(db);
Like.associate(db);



export { db };
