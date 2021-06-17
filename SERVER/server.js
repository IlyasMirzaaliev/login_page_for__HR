const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const hbs = require("handlebars");
const app = express();
require("dotenv").config();
const sql = require("./dbconnect/dbconnect");

const PORT = process.env.PORT;

// app.use(express.static('public'));

//parsing www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

//parsing app/json
app.use(express.json());

app.use(cookieParser());
app.disable("etag");

//Defining routes
require("./routes/routes")(app);

const publicDirectory = path.join(__dirname, "./public");
// console.log(publicDirectory);
app.use(express.static(publicDirectory));

// app.engine("hbs", hbs());
app.set("view engine", "hbs");

const appStart = async () => {
  try {
    await sql.connect((err, res) => {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log(`DB Connected`);
      }
    });
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

appStart();
