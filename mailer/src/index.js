const Mailer = require('./classes/mailer');
const Rabbit = require('./classes/rabbit');

const run = async () => {
    try {
        await Mailer.init();
        await Rabbit.run();
    } catch (exception) {
        throw new Error(exception);
    }
};

run();
