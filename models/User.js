const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt =require("bcrypt");

class User extends Model {}

User.init(
{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[8]
        },
    },
},
{
    sequelize,
    hooks:{
        beforeCreate:async (newUser)=>{
            newUser.password = await bcrypt.hash(newUser.password,10);
        }
    },
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
},
)

module.exports = User