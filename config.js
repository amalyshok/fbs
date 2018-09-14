console.log('запустился ' + __filename);
module.exports = {
  PORT: process.env.PORT || 3000,
  dbUrlAtlas:
    'mongodb+srv://amalyshok:S1pa2Wn3@footballdata-zxox4.mongodb.net/test?retryWrites=true',
  dbUrlMlab: 'mongodb://amalyshok:S1pa2Wn3@ds161710.mlab.com:61710/scores',
  dbUrlLocal: 'mongodb://127.0.0.1:27017/test',
  get dbUrl() {
    return this.dbUrlMlab;
  }
};

console.log('исполнился ' + __filename);
