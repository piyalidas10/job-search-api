module.exports = class errorCheck {
    constructor() {}

    checkApiError(str) {
        const n = str.search('<error>');
        return n;
    }
};