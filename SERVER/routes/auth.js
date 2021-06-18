const Router = require("express").Router;
const authController = require("../controllers_auth/controller_auth");
const router = new Router();

router.post("/register", authController.register);

module.exports = router;
