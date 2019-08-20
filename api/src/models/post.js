const Sequelize = require('sequelize');
const { sequelize } = require('../database');

module.exports = sequelize.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false,
        max: 256,
        min: 1,
        notEmpty: true
    },
    picture: {
        type: Sequelize.STRING,
        allowNull: true
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
        isDate: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'user_id'
    }
});
