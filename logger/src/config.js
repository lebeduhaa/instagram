module.exports = {
    databaseUrl: 'mongodb://mongo/insta-logs',
    rabbitUrl: process.env.rabbitURL,
    logsQueue: 'insta-clone-logs'
};
