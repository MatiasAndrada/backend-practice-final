const router = require("express").Router();
const moment = require("moment");
const logger = require("../logs/logger");
const Product = require("../models/product.model");

//Auth
const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/");
};

//!PRODUCTS
router.get("/", isAuthenticated, function (req, res, next) {
    //Buscar todos los productos
    logger.info("GET /api/product");
    Product.find({}, function (err, products) {
        if (err) return next(err);
        res.send(products);
    });
});

router.get("/:product_id", isAuthenticated, function (req, res, next) {
    //Buscar un producto por id
    logger.info("GET /api/product/:product_id");
    Product.findById({ _id: req.params.product_id }, function (err, product) {
        if (err) return next(err);
        res.send(product);
    });
});

router.post("/", function (req, res, next) {
    //Crear un producto
    logger.info("POST /api/product");
    console.log(req.body)
    var product = new Product();
    product.timestamp = moment().format("DD/MM/YYYY HH:mm:ss");
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.thumbnail = req.body.thumbnail;
    product.save(function (err) {
        if (err) return next(err);
        logger.info("POST /api/product - Producto creado");
        res.status(200)
    }
    );

});


router.delete("/", isAuthenticated, function (req, res, next) {
    //Eliminar todos los productos
    logger.info("DELETE /api/product");
    Product.deleteMany({}, function (err) {
        if (err) return next(err);
        logger.info("DELETE /api/product - Productos eliminados");
        res.send("Productos eliminados");
    });
});


router.delete("/:product_id", isAuthenticated, function (req, res, next) {
    //Eliminar un producto o todos
    logger.info("DELETE /api/product/:product_id");
    Product.findByIdAndDelete({ _id: req.params.product_id }, function (err) {
        if (err) return next(err);
        logger.info("DELETE /api/product/:product_id - Producto eliminado");
        res.send("Producto eliminado");
    });
});

module.exports = router;
