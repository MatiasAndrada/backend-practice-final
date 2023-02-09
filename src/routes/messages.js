const isAuthenticated = require('../middleware/auth');
const router = require('express').Router();

router.get('/', isAuthenticated, (req, res) => {
      res.render("messages", { root: "public", user: req.user.username });
    }
);

module.exports = router;
