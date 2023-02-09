const { ProductRepo } = require("../repositories/ProductRepo");
const logger = require("../utils/logger");

exports.getAll = (req, res) => {
    if (req.query.filter) {
        next();
        return;
    }
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

exports.getById = (req, res) => {
    if (req.query.filter) {
        next();
        return;
    }
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

exports.getByCategory = async (req, res) => {
    const productos   = await ProductRepo.getAll();
    const productosFiltrados = productos.filter(producto => producto.category === req.params.category);
    res.json(productosFiltrados);
};


exports.save = (req, res) => {
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
        .then((newId) => {
            res.json({ message: "Product created successfully", id: newId });
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).json({
                message: "Error creating Product",
            });
        });
};

exports.saveAll = (req, res) => {
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

exports.update = (req, res) => {
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

exports.deleteAll = (req, res) => {
    if (req.query.filter) {
        next();
        return;
    }
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
exports.deleteById = (req, res) => {
    ProductRepo.deleteById(req.params.id)
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

