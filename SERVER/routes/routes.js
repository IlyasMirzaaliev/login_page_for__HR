module.exports = (app) => {
  app.get("/", (req, res) => {
    res.render("index");
  });

  // app.get("/status", (req, res) => {

  // });
};