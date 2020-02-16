const path = require('path');

const pathName = path.dirname(process.mainModule.filename);

module.exports = pathName;