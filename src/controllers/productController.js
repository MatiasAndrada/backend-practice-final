const { ProductRepo } = require("../repositories/ProductRepo");
const logger = require("../utils/logger");
const moment = require("moment");

exports.getProducts = (req, res, next) => {
    ProductRepo.getAll()
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).json({
                message: "Error retrieving Products",
            });
        });
};

exports.getProductById = (req, res) => {
    ProductRepo.getById(req.params.id)
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).json({
                message: "Error retrieving Product with id " + req.params.id,
            });
        });
};

exports.createProduct = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).json({
            message: "Content can not be empty!",
        });
    }
    const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        category: req.body.category,
    };

    ProductRepo.save(product)
        .then(() => {
            res.json({ message: "Product created successfully" });
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).json({
                message: "Error creating Product",
            });
        });
};

exports.createProducts = (req, res) => {
    ProductRepo.saveAll(req.body)
        .then(() => {
            res.json({ message: "Products created successfully" });
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).json({
                message: "Error creating Products",
            });
        });
};

exports.updateProduct = (req, res) => {
    ProductRepo.update(req.params.id, req.body)
        .then(() => {
            res.json({ message: "Product updated successfully" });
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).json({
                message: "Error updating Product with id " + req.params.id,
            });
        });
};

exports.deleteProduct = (req, res) => {
    ProductRepo.delete(req.params.id)
        .then(() => {
            res.json({ message: "Product deleted successfully" });
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).json({
                message: "Error deleting Product with id " + req.params.id,
            });
        });
};

exports.deleteProducts = (req, res) => {
    ProductRepo.deleteAll()
        .then(() => {
            res.json({ message: "Products deleted successfully" });
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).json({
                message: "Error deleting Products",
            });
        });
};
