
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Post = sequelize.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    imageUrl: Sequelize.STRING,
    description: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    }
});

module.exports = Post;

