
const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");


/* GET home Page */
router.get("/home", isAuthenticated, function (req, res) {
  res.sendFile("home.html", { root: "public", user: req.user });
});
/* GET user dashboard */
router.get("/dashboard", isAuthenticated, (req, res) => {
  res.sendFile("dashboard.html", { root: "public", user: req.user });
});

/* GET user Data */
router.get("/datos", isAuthenticated, (req, res) => {
  res.render("datos", { root: "public", user: req.user });
});

module.exports = router;
