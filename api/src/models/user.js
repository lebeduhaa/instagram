const Sequelize = require('sequelize');
const { sequelize } = require('../database');
const Hash = require('../classes/hash');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'first_name',
        max: 50,
        min: 0,
        notEmpty: true
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'last_name',
        max: 50,
        min: 0,
        notEmpty: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true,
        notEmpty: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    },
    status: {
        type: Sequelize.ENUM(['active', 'requested', 'deleted']),
        defaultValue: 'active',
        allowNull: false
    },
    role: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
}, {
    instanceMethods: {

        getSome() {
            return 'SOME)))';
        }
    }
});

User.prototype.validPassword = async function (password) {
    return await Hash.compare(password, this.password);
};

User.beforeCreate(async (user, options) => user.password = await Hash.get(user.password));

module.exports = User;
