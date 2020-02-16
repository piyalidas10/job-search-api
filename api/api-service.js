const githubConfig = require('./github/config');
const indeedConfig = require('./indeed/config');

module.exports = class apiSites {
    constructor() {}

    checkApiUrl(txt) {
        switch (txt) {
            case 'github':
                return githubConfig.api_config;
                break;
            case 'indeed':
                return indeedConfig.api_config;
                break;
            default:
                return githubConfig.api_config;
        }
    }
};
