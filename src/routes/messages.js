const isAuthenticated = require('../middleware/auth');
const router = require('express').Router();

router.get('/', isAuthenticated, (req, res) => {
    res.sendFile('messages.html', {root: "public", user: req.user});
    }
);

module.exports = router;
