// ./index.js
const config = require('./config');
const app = require('./app');
app.listen(3000, () => console.log('Http started on port: ' + config.PORT));
