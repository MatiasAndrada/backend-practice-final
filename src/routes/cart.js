

const router = require("express").Router();

const cartController = require("../controllers/cartController");

//Auth
const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/");
};

//Get cart
router.get("/", isAuthenticated, cartController.getCart);

//Add to cart
router.post("/", isAuthenticated, cartController.addToCart);



module.exports = router;