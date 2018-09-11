console.log('запустился ' + __filename);
module.exports = {
  PORT: process.env.PORT || 3000,
  dbUrl:
    'mongodb+srv://amalyshok:S1pa2Wn3@footballdata-zxox4.mongodb.net/test?retryWrites=true'
};

console.log('исполнился ' + __filename);
