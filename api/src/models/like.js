const Sequelize = require('sequelize');
const { sequelize } = require('../database');

module.exports = sequelize.define('like', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
});
