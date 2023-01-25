//rutas de carrito vinculado a cada usuario

const router = require("express").Router();
const logger = require("../logs/logger");
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
    //Mostrar carrito
    logger.info("GET /api/cart");
    Cart.findOne({ owner: req.user._id })
        .populate("items.item")
        .exec(function (err, cart) {
            if (err) return next(err);
            res.json(cart);
            console.log("🦇 ~ file: cart.js:25 ~ cart", cart);
        });
});

router.post("/:product_id", isAuthenticated, function (req, res, next) {
    //Agregar un producto al carrito y si este ya esta aumentar la cantidad
    logger.info("POST /api/cart/:product_id");
    Cart.findOne({ owner: req.user._id }, function (err, cart) {
        if(err) next(err)
        Product.findById(req.params.product_id, function (err, product) {
            if(err) next(err)
            if (product) {
                cart.items.findById(req.params.product_id, function (err, item) {
                if(err) next(err)
                    if (item) {
                        item.quantity += 1;
                        item.price = (
                            item.price + parseFloat(req.body.priceValue)
                        ).toFixed(2);
                        cart.total = (
                            cart.total + parseFloat(req.body.priceValue)
                        ).toFixed(2);
                    }
                    if (!item) {
                        cart.items.push({
                            item: req.params.product_id,
                            price: parseFloat(req.body.priceValue).toFixed(2),
                            quantity: 1,
                        });
                        cart.total = (
                            cart.total + parseFloat(req.body.priceValue)
                        ).toFixed(2);
                    }
                    cart.save(function (err) {
                        if (err) return next(err);
                        logger.info(
                            "POST /api/cart/:product_id - Producto agregado al carrito"
                        );
                        res.redirect("/cart");
                    }
                    );
});
            }

  

router.delete(
    "/product/:product_id",
    isAuthenticated,
    function (req, res, next) {
        //Eliminar un producto del carrito
        logger.info("DELETE /api/cart/product/:product_id");
        if (req.product_id) {
            //elimina uno
            Cart.findOne({ owner: req.user._id }, function (err, foundCart) {
                foundCart.items.pull(String(req.params.product_id));
                foundCart.total = (
                    foundCart.total - parseFloat(req.body.priceValue)
                ).toFixed(2);
                foundCart.save(function (err, found) {
                    if (err) return next(err);
                    logger.info(
                        "DELETE /api/cart/product/:product_id - Producto eliminado del carrito"
                    );
                    res.redirect("/cart");
                });
            });
        } else {
            //eliminar todos
            Cart.findOne({ owner: req.user._id }, function (err, foundCart) {
                foundCart.items.pull();
                foundCart.total = 0;
                foundCart.save(function (err, found) {
                    if (err) return next(err);
                    logger.info(
                        "DELETE /api/cart/product/- Todos los productos eliminados"
                    );
                    res.redirect("/cart");
                });
            });
        }
    }
);

module.exports = router;
