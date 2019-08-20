module.exports = {
    server: {
        port: process.env.PORT || 3000
    },
    database: {
        host: process.env.POSTGRES_URL || 'localhost',
        dialect: 'postgres',
        name: 'instagram',
        password: process.env.DB_PASSWORD
    },
    rabbitMQ: {
        url: process.env.rabbitURL,
        emailsQueue: 'insta-clone-emails',
        logsQueue: 'insta-clone-logs'
    }
};
