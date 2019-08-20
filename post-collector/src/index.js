const moment = require('moment');
const database = require('./database');
const Post = require('./post');
const Rabbit = require('./classes/rabbit');
const constants = require('./constants');

Rabbit.run()
    .then(async () => {
        try {
            await database.connect();
            setInterval(async () => {
                try {
                    const posts = await Post.findAll();

                    posts.forEach((post) => {
                        const days = Math.floor(moment().diff(moment(post.createdAt)) / 1000 / 60 / 60 / 24);

                        if (days > 30) {
                            Rabbit.sendToLogsQueue({
                                logType: constants.logTypes.info,
                                content: `Post with id ${post.id} was created more than 30 days ago! It was deleted by system!`
                            });
                            post.destroy();
                        }
                    });
                } catch (exception) {
                    throw new Error(exception);
                }
            }, 1000 * 60 * 60 * 24);
        } catch (exception) {
            Rabbit.sendToLogsQueue({
                logType: constants.logTypes.error,
                content: exception
            });
        }
    });
