module.exports = {
    user: process.env.INSTA_CLONE_USER,
    password: process.env.INSTA_CLONE_MAIL_PASS,
    rabbitUrl: process.env.rabbitURL,
    mailService: 'gmail',
    mailSubject: 'insta clone notification',
    emailQueue: 'insta-clone-emails',
    logsQueue: 'insta-clone-logs'
};
