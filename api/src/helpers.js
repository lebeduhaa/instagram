const fileSystem = require('fs');
const InternalServerError = require('./classes/errors/internal-server');

exports.copyFile = (source, dist) => new Promise((resolve, reject) => {
    const sourceStream = fileSystem.createReadStream(source);
    const targetStream = fileSystem.createWriteStream(dist);

    sourceStream.pipe(targetStream);
    sourceStream.on('close', () => resolve());
});

exports.deleteFile = path => new Promise((resolve, reject) => {
    fileSystem.unlink(path, (err) => {
        if (err) {
            reject(new InternalServerError(`File was not deleted!${err}`));
        }

        resolve();
    });
});

exports.splitPaginationFromQuery = (query) => {
    const pagination = {
        page: Number(query.page),
        size: Number(query.size)
    };

    delete query.page;
    delete query.size;

    return {
        pagination,
        options: query
    }
};

exports.splitOptionsAndCertainField = (query, certainField) => {
    const result = {
        [certainField]: query[certainField],
        query
    };

    delete query[certainField];

    return result;
}
