const bcrypt = require('bcrypt');

class Hash {
    get(data) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(data, 10, (err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            });
        });
    }

    compare(data, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(data, hash, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = new Hash();
