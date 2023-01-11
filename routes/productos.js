const express = require("express");
const router = express.Router();
const { productsApi } = require("../daos/index");
const logger = require("../logs/logger");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");


//Auth
const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
};

//ruta sin autenticacion
router.get(":id?", async (req, res) => {
  // Devuelve todos los productos.
  logger.info("GET /api/productos")
  let id = req.params.id;
  const allProducts = await productsApi.getAll();
  if (id) {
    const product = allProducts.find((product) => product.id == id);
    if (product) {
      res.send(product);
    } else {
      logger.error("GET /api/productos/:id - Producto no encontrado")
      res.status(400).json({ error: "Producto no encontrado" });
    }
  } else {
    if (allProducts.length === 0) {
      res.send([])
    } else {
      res.send(allProducts);
    }
  }
});

router.post("/", async (req, res) => {
  //Recibe y agrega un producto, y lo devuelve con su id asignado
  logger.info("POST /api/productos")
  let allProducts = await productsApi.getAll();
  const { name, description, thumbnail, price } = req.body;
  if (!name || !description || !thumbnail || !price) {
    logger.error("POST /api/productos - Ingrese todos los datos del producto")
    res.status(400).json({ error: "Ingrese todos los datos del producto" });
  }
  let timestamp = moment().format("DD/MM/YYYY HH:mm:ss");
  let newId;
  let code = uuidv4();
  let stock = "0";
  if (allProducts.length === 0) {
    newId = 1;
  } else {
    newId = parseInt(allProducts[allProducts.length - 1].id) + 1;
  }
  allProducts.push({
    id: newId,
    name: name,
    description: description,
    thumbnail: thumbnail,
    price: price,
    "timestamp(producto)": timestamp,
    code: code,
    stock: stock,
  });

  await productsApi.saveAll(allProducts);
  res.send("product successfully").status(200);
});

router.put("/:id", isAuthenticated, async (req, res) => {
  //Recibe y actualiza un producto según su id
  logger.info("PUT /api/productos/:id")
  let allProducts = await productsApi.getAll();
  const findProduct = allProducts.find(
    (producto) => parseInt(producto.id) === parseInt(req.params.id)
  );
  const { name, description, thumbnail, price } = req.body;
  const timestamp = moment().format("DD/MM/YYYY HH:mm:ss");
  if (!findProduct) {
    logger.error("PUT /api/productos/:id - Producto no encontrado")
    res.status(400).json({ error: "Producto no encontrado" });
  } else {
    if (!name || !description || !thumbnail || !price) {
      logger.error("PUT /api/productos/:id - Ingrese todos los datos del producto")
      res.status(400).json({ error: "Ingrese todos los datos del producto" });
    } else {
      let newProduct = {
        id: parseInt(req.params.id),
        timestamp: timestamp,
        name: name,
        description: description,
        thumbnail: thumbnail,
        price: price,
        code: findProduct.code,
        stock: 0,
      };
      await productsApi.putById(parseInt(req.params.id), newProduct);
      await productsApi.saveAll(allProducts);
      const iD = allProducts.find(
        (producto) => parseInt(producto.id) === parseInt(req.params.id)
      );
      res.send(iD).status(200);
    }
  }
});

router.delete("/:id", isAuthenticated, async (req, res) => {
  //Elimina un producto o todos o alguno según su id.
  logger.info("DELETE /api/productos/:id")
  let id = req.params.id;
  if (id) {
    let allProducts = await productsApi.getAll();
    const findProduct = allProducts.find((product) => product.id == id);
    if (findProduct) {
      await productsApi.deleteById(req.params.id);
      res.send("Producto eliminado").status(200);
    } else {
      logger.error("DELETE /api/productos/:id - Producto no encontrado")
      res.send("Producto no encontrado").status(404);
    }
  } else {
    allProducts = [];
    await productsApi.saveAll(allProducts);
    res.send("Productos eliminados").status(200);
  }
});

module.exports = router;
