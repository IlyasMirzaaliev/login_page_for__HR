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

// const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(path.join(__dirname, "./public")));

// app.engine("hbs", hbs());
app.set("view engine", "hbs");

//Defining routes
app.use("/", require("./routes/routes"));
app.use("/auth", require("./routes/auth"));

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
