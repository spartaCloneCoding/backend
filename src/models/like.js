import Sequelize from "sequelize";

import { sequelize } from "./sequelize.js";

export default class Like extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
               like : {
                type : Sequelize.BOOLEAN,
                allowNull : false,
               }
            },
            {
                sequelize,
                timestamps: false,
                paranoid: false, //
                underscored: false, // created_at
                modelName: "Like",
                tableName: "like",
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
    static associate(db) {
        db.User.belongsToMany(db.Post, {through: 'Like'});
        db.Post.belongsToMany(db.User, {through: 'Like'});
    }
}