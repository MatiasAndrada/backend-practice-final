const router = require("express").Router();
const moment = require("moment");
const logger = require("../logs/logger");
const Product = require("../models/product.model");

//Auth
const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    
    res.redirect("/");
    }

//!PRODUCTS
router.get("/", isAuthenticated, function(req, res, next){
    //Buscar todos los productos
    logger.info("GET /api/products")
    Product.find({}, function(err, products){
        if(err) return next(err);
        res.send(products);
    }
    )
})

router.get("/:product_id", isAuthenticated, function(req, res, next){
    //Buscar un producto por id
    logger.info("GET /api/products/:product_id")
    Product.findById({_id: req.params.product_id}, function(err, product){
        if(err) return next(err);
        res.send(product);
    })
}
)

router.post("/", isAuthenticated, function(req, res, next){
    //Crear un producto
    logger.info("POST /api/products")
    var product = new Product();
    product.timestamp =  moment().format("DD/MM/YYYY HH:mm:ss");
    product.name = req.body.name;
    product.description = req.body.description;
    product.code = req.body.code;
    product.thumbnail = req.body.thumbnail;
    product.price = req.body.price;
    product.stock = req.body.stock;
    product.save(function(err){
        if(err) return next(err);
        logger.info("POST /api/products - Producto creado")
        res.send("Producto creado");
    })
})

router.delete("/:product_id", isAuthenticated, function(req, res, next){
    //Eliminar un producto o todos
    logger.info("DELETE /api/products/:product_id")
    if(req.params.product_id){
        //elimina producto por id
        Product.findByIdAndDelete({_id: req.params.product_id}, function(err){
            if(err) return next(err);
            logger.info("DELETE /api/products/:product_id - Producto eliminado")
            res.send("Producto eliminado");
        })
    }else{
        //elimina todos los productos
        Product.deleteMany({}, function(err){
            if(err) return next(err);
            logger.info("DELETE /api/products - Todos los productos eliminados")
            res.send("Todos los productos eliminados");
        })
    }
})


module.exports = router;