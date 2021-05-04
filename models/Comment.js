const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');


class Comment extends Model {}

Comment.init(
{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    content:{
        type:DataTypes.STRING(255),
        allowNull:false,
        unique:true,
    },
    user_id:{
        type:DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id',
        },
    },
    article_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: 'Article',
            key: 'id',
        },
    },
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
})

module.exports = Comment