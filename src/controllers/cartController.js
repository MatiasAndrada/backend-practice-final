const {CartRepo} = require("../repositories/CartRepo");

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
