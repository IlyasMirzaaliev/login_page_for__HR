const mysql = require("mysql");
const dotenv = require("dotenv");

module.exports = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "HR",
});

// module.exports = sql.connect((err, res) => {
//   if (err) {
//     console.log(err);
//     return;
//   } else {
//     console.log(`DB Connected`);
//   }
// });
