const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const productController = require("../controllers/productController");



//Get all products
router.get("/", isAuthenticated, productController.getProducts);

//Get product by id
router.get("/:id", isAuthenticated,  productController.getProductById);

//Create new product
router.post("/", productController.createProduct);

//Create new products
router.post("/all" , productController.createProducts);

//Update product
router.put("/:id", isAuthenticated,  productController.updateProduct);


//Delete all products
router.delete("/", isAuthenticated,  productController.deleteProducts);

//Delete product
router.delete("/:id",  isAuthenticated, productController.deleteProduct);



module.exports = router;
