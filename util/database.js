const Sequelize = require('sequelize');

const sequelize = new Sequelize('snapShare', 'root', '#@focus28', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;