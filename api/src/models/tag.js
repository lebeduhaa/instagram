const Sequelize = require('sequelize');
const { sequelize } = require('../database');

module.exports = sequelize.define('tag', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        max: 20,
        min: 1,
        notEmpty: true
    }
});
