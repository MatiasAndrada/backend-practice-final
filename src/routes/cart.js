

const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const cartController = require("../controllers/cartController");


//Get cart
router.get("/", isAuthenticated, cartController.getAll);

//Add to cart
router.post("/", isAuthenticated, cartController.addToCart);

//Delete from cart
router.delete("/:id", isAuthenticated, cartController.deleteById);

//Delete all cart
router.delete("/", isAuthenticated, cartController.deleteAll);




module.exports = router;