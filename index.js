// ./index.js
console.log('запустился ' + __filename);
require('./db/database');
const config = require('./config');
const http = require('./app');
console.log('исполнился ' + __filename);

http.listen(config.PORT, () =>
  console.log('Http started on port: ' + config.PORT)
);

/*
запустился E:\node\fbs\index.js
запустился E:\node\fbs\db\database.js
запустился E:\node\fbs\config.js
исполнился E:\node\fbs\config.js
исполнился E:\node\fbs\db\database.js
запустился E:\node\fbs\app.js
запустился E:\node\fbs\static\socket\serverSocket.js
исполнился E:\node\fbs\static\socket\serverSocket.js
исполнился E:\node\fbs\app.js
исполнился E:\node\fbs\index.js
*/
