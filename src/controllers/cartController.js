const { CartRepo } = require("../repositories/CartRepo");
const logger = require("../utils/logger");

exports.getAll = (req, res) => {
    const idUser = req.user._id;
    CartRepo.getAll(idUser)
        .then((cart) => {
            res.json(cart);
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).json({
                message: "Error retrieving Cart",
            });
        });
};

exports.save = (req, res) => {
    const idUser = req.user._id;
    let { quantity, price, idProduct } = req.body;
    quantity = parseInt(quantity);
    price = parseInt(price);
    CartRepo.save(idUser, idProduct, quantity, price)
        .then(() => {
            res.send("Se ha agregado al carrito");
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).json({  
                message: "Error adding to Cart",
            });
        });
    };
    
    exports.deleteAll = (req, res) => {
        if (req.query.filter) {
            next();
            return;
        }
        const idUser = req.user._id;
        CartRepo.deleteAll(idUser)
            .then(() => {
                res.send("Se ha eliminado el carrito");
            })
            .catch((err) => {
                logger.error(err);
                res.status(500).json({
                    message: "Error deleting all Cart",
                });
            });
    }
exports.deleteById = (req, res) => {
    const idUser = req.user._id;
    const idProduct = req.params.id;
    const { priceAmount } = req.body;
    CartRepo.deleteById(idUser, idProduct, priceAmount)
        .then(() => {
            res.send("Se ha eliminado del carrito");
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).json({
                message: "Error deleting from Cart",
            });
        });
};

