const sql = require("../dbconnect/dbconnect");

exports.register = (req, res) => {
  console.log({ messgae: req.body });
  res.json({
    message: req.body,
  });
};
