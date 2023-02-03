//rutas de carrito vinculado a cada usuario

const router = require("express").Router();
const logger = require("../utils/logger");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

//Auth
const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/");
};
//Carts

//middleware para manejar errores
router.use(function (err, req, res, next) {
    logger.error(err.stack);
    res.status(500).send("Algo salio mal!");
});

router.get("/", isAuthenticated, function (req, res, next) {
    //Devolver carrito
    logger.info("GET /api/cart");
    Cart.findOne({ owner: req.user._id })
        .populate("items.item")
        .exec(function (err, cart) {
            if (err) return next(err);
            res.json(cart);
        });
});

router.post("/:product_id", isAuthenticated, function (req, res, next) {
    //Agregar un producto al carrito
    logger.info("POST /api/cart/:product_id");
    console.log(req.params.product_id)
    Cart.findOne({ owner: req.user._id }, function (err, cart) {
        if (err) return next(err);
        cart.items.push({
            item: req.params.product_id,
            quantity: parseInt(req.body.quantity),
            priceAmount: parseFloat(req.body.priceAmount),
        });

        cart.total = (cart.total + parseFloat(req.body.priceAmount)).toFixed(2);
        cart.save(function (err) {
            if (err) return next(err);
            logger.info("POST /api/cart/:product_id - Producto agregado al carrito");
            res.send("Se ha agregado el item al carrito").status(200);
        });
    });
});
router.delete("/:product_id", isAuthenticated, function (req, res, next) {
    logger.info("DELETE /api/cart/:product_id");
    //Buscar producto por id y eliminar
    Cart.findOne({ owner: req.user._id }, function (err, cart) {
        if (err) return next(err)
        var productId = req.params.product_id
        cart.items.pull({ item: productId});
        cart.total = (cart.total - parseFloat(req.body.priceAmount)).toFixed(2);
        cart.save(function (err, found) {
            if (err) return next(err)
            logger.info("DELETE /api/cart/:product_id - Producto eliminado del carrito");
            res.send("Se ha eliminado el item del carrito").status(200);
        });
    });
});

router.delete("/", isAuthenticated, function (req, res, next) {
    //Eliminar todos los productos del carrito
    logger.info("DELETE /api/cart");
    Cart.findOne({ owner: req.user._id }, function (err, cart) {
        cart.items.pull({});
        cart.total = 0;
        cart.save(function (err, found) {
            if (err) return next(err);
            logger.info(
                "DELETE /api/cart - Todos los productos eliminados del carrito"
            );
            res.send("Se ha eliminado el item del carrito").status(200);
        });
    });
});

module.exports = router;
