const cors = require('cors');
const path = require('path');
const express = require('express');

const { serverOptions } = require('./utils/getSslCertificat');

const { http: httpPort } = config.get('port');

const app = express();

app.listen(httpPort);
const server = require('https').createServer(serverOptions, app);

if(process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        (req.secure) ? next() : res.redirect(`https://${req.headers.host}${req.url}`);
    });
}

app.use(cors());
app.use(express.json({ extended: true }));

app.use('/', express.static(path.join(__dirname, 'public')));
app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')));

module.exports ={
    server
};