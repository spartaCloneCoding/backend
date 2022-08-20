import Sequelize from "sequelize";

import { sequelize } from "./sequelize.js";

export default class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                title: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                content: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                paranoid: false,
                underscored: false,
                modelName: "Post",
                tableName: "post",
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
    static associate(db) {
        db.Post.hasMany(db.Comment, {
            onDelete: "cascade",
            onUpdate: "cascade",
        });
        db.Post.belongsTo(db.User);
    }
}
