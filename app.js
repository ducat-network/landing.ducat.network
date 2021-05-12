const config = require('config');
const { server } = require('./configureServer');

const { https: httpsPort } = config.get('port');

(async () => {
    try {
        server.listen(httpsPort, () => console.log(`[SERVER]: Started on port ${httpsPort}!`));
    } catch (error) {
        console.log('[INIT ERROR]:', error);
    }
})();