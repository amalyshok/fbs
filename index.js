// ./index.js
console.log('запустился ' + __filename);

require('./db/database');

const config = require('./config');
const http = require('./app');
console.log('исполнился ' + __filename);

http.listen(config.PORT, () =>
  console.log('Http started on port: ' + config.PORT)
);
