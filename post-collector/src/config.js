module.exports = {
    host: 'postgres',
    dialect: 'postgres',
    name: 'instagram',
    password: process.env.DB_PASSWORD,
    rabbitUrl: process.env.rabbitURL,
    logsQueue: 'insta-clone-logs'
};
