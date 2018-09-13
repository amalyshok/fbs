console.log('запустился ' + __filename);
module.exports = {
  PORT: process.env.PORT || 3000,
  dbUrl:
    'mongodb+srv://amalyshok:S1pa2Wn3@footballdata-zxox4.mongodb.net/test?retryWrites=true',
  dbUrlLocal: 'mongodb://localhost:27017/users'
};

console.log('исполнился ' + __filename);
