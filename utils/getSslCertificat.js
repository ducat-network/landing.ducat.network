const path = require('path');
const fs = require('fs');

const serverOptions = {
    key: fs.readFileSync(path.resolve(__dirname, '..', 'ssl-certification', 'key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '..', 'ssl-certification', 'cert.pem'))
};

module.exports = {
    serverOptions
};