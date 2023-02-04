const router = require("express").Router();
const productController = require("../controllers/productController");

//Get all products
router.get("/", productController.getProducts);

//Get product by id
router.get("/:id", productController.getProductById);

//Create new product
router.post("/", productController.createProduct);

//Create new products
router.post("/all", productController.createProducts);

//Update product
router.put("/:id", productController.updateProduct);


//Delete all products
router.delete("/", productController.deleteProducts);

//Delete product
router.delete("/:id", productController.deleteProduct);



module.exports = router;
