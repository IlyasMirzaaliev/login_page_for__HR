const mysql = require("../dbconnect/dbconnect.js");

//User model
const User = (user) => {
  this.name = user.name;
  this.lastname = user.lastname;
  this.login = user.login;
  this.password = user.password;
  this.passwordConfirm = user.passwordConfirm;
};


User.create = (newUser, result) => {
  sql.query(`INSERT INTO myTable SET ?`, newUser, (err, res) => {
    if (err) {
      console.log("Ошибка создания " + err);
      result(err, null);
    } else {
      console.log("User Added");
      result(null, res);
    }
  });
};

module.export = User;
