const {CartRepo} = require("../repositories/CartRepo");
const logger = require('../utils/logger');

exports.getCart = (req, res) =>
{
    const idUser = req.user._id;
    console.log(idUser)
    console.log(CartRepo)
    console.log(CartRepo.getCart(idUser))
 /*   CartRepo.getCart(idUser)
        .then((cart) => {
            res.json(cart);
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).json({
                message: "Error retrieving Cart",
            });
        });*/
}

exports.addToCart= (req, res) => {

    console.log(0)
    const idUser = req.user._id;
    console.log("🦇 ~ file: cartController.js:24 ~ idUser", idUser)
   
    const idProduct = req.params.id
    console.log("🦇 ~ file: cartController.js:26 ~ idProduct", idProduct)

    const quantity = req.body.quantity;
    console.log("🦇 ~ file: cartController.js:28 ~ quantity", quantity)
    CartRepo.addToCart(idUser, idProduct, quantity)
        .then((cart) => {
            res.json(cart);
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).json({
                message: "Error adding to Cart",
            });
        });
}
