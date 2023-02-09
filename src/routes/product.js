const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const productController = require("../controllers/productController");



//Get all products
router.get("/", productController.getAll);

//Get product by id
router.get("/:id", productController.getById);

//Get product by Category
router.get("/category/:category", productController.getByCategory);

//Create new product
router.post("/", productController.save);

//Create new products
router.post("/all",  productController.saveAll);

//Update product
router.put("/:id", isAuthenticated,  productController.update);

//Delete all products
router.delete("/", isAuthenticated,  productController.deleteAll);

//Delete product
router.delete("/:id",  isAuthenticated, productController.deleteById);



module.exports = router;
