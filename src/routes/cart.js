//rutas de carrito vinculado a cada usuario

const router = require("express").Router();
const logger = require("../logs/logger");
/* const moment = require("moment"); */
const Product = require("../models/product.model")
const Cart = require("../models/cart.model")

//Auth
const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    
    res.redirect("/");
    }

//Carts
router.get("/", isAuthenticated, function(req, res, next){
    //Buscar carrito de usuario y devolverlo
    logger.info("GET /api/cart")
    Cart.findOne({owner: req.user._id}
        .populate("items.item")
        .exec(function(err, foundCart){
            if(err) return next(err);
            res.send(foundCart);
        })
    )
})

router.post("/product/:product_id", isAuthenticated, function(req, res, next){
    //Agregar producto al carrito
    logger.info("POST /api/cart/product/:product_id")
    Cart.findOne({owner: req.user._id}, function(err, cart){
        cart.items.push({
            item: req.params.product_id,
            price: parseFloat(req.body.priceValue),
            quantity: parseInt(req.body.quantity)
        });
        cart.total = (cart.total + parseFloat(req.body.priceValue)).toFixed(2);
        cart.save(function(err){
            if(err) return next(err);
            logger.info("POST /api/cart/product/:product_id - Producto agregado al carrito")
            return res.redirect("/cart");
        });
    });
})

router.delete("/product/:product_id", isAuthenticated, function(req, res, next){
    //Eliminar un producto del carrito
    logger.info("DELETE /api/cart/product/:product_id")
   if(req.product_id){
        //elimina uno
        Cart.findOne({owner: req.user._id}, function(err, foundCart){
            foundCart.items.pull(String(req.params.product_id));
            foundCart.total = (foundCart.total - parseFloat(req.body.priceValue)).toFixed(2);
            foundCart.save(function(err, found){
                if(err) return next(err);
                logger.info("DELETE /api/cart/product/:product_id - Producto eliminado del carrito")
                res.redirect("/cart");
            });
        });
    }else{
        //eliminar todos
        Cart.findOne({owner: req.user._id}, function(err, foundCart){
            foundCart.items.pull();
            foundCart.total = 0;
            foundCart.save(function(err, found){
                if(err) return next(err);
                logger.info("DELETE /api/cart/product/- Todos los productos eliminados")
                res.redirect("/cart");
            });
        })
    }
})

module.exports = router;
