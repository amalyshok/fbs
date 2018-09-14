let mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
let md5 = require('./md5');

let userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  login: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    required: true,
    set: generatePassword,
    type: String
  },
  email: {
    required: true,
    unique: true,
    type: String
  },
  solt: {
    required: true,
    type: String
  },
  name: {
    firstName: String,
    lastName: String
  },
  age: Number,
  role: {
    required: true,
    default: 'user',
    type: String
  },
  created: {
    required: true,
    type: Date,
    default: Date.now
  }
});

function generatePassword(pass) {
  let solt = +new Date() + Math.random().toString(36);
  this.solt = solt;
  return md5(pass + solt);
}

let usersModel = mongoose.model('users', userSchema);

function addUser(login, email, password) {
  let User = new usersModel({
    _id: new mongoose.Types.ObjectId(),
    login: login,
    password: password,
    email: email
  });
  User.save(err => {
    if (err) console.log('Ошибка добавления!\n' + err.message);
    else {
      console.log('Пользователь успешно добавлен!');
    }
  });
}

function checkUser(email, password) {
  let regexp = new RegExp('^' + email + '$', 'i');
  usersModel
    .find({
      email: regexp
    })
    .exec((err, user) => {
      if (err) console.log('Ошибка при поиске пользователя');
      let pass = md5(password + user[0].solt);
      if (pass === user[0].password) return true;
      else return false;
    });
  // каким-то раком нужно из асинхронного userModel.find достать ретурны. и логин заработает
}

module.exports.checkUser = checkUser;
module.exports.addUser = addUser;
module.exports.usersModel = usersModel;
