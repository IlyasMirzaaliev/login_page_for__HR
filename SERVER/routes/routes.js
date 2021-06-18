const Router = require("express").Router;
const router = new Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/register", (req, res) => {
  res.render("register");
});

module.exports = router;
