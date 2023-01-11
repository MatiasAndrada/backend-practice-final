/*El router base '/api/carrito' implementará tres rutas disponibles para usuarios y administradores:
POST: '/' - Crea un carrito y devuelve su id.
DELETE: '/:id' - Vacía un carrito y lo elimina.
GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto

Crear una variable booleana administrador, cuyo valor configuraremos más adelante con el sistema de login. Según su valor (true ó false) me permitirá alcanzar o no las rutas indicadas. En el caso de recibir un request a una ruta no permitida por el perfil, devolver un objeto de error. Ejemplo: { error : -1, descripcion: ruta 'x' método 'y' no autorizada }
*/
const express = require("express");
const router = express.Router();
const logger = require("../logs/logger");
const moment = require("moment");
const { productsApi, cartApi } = require("../daos/index");

//Auth
const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/");
};

//Carts
router.post("/", isAuthenticated, async (req, res) => {
  //Recibe y agrega un carrito, y devuelve su id asignado.
  logger.info("POST /api/carrito");
  let allCart = await cartApi.getAll();
  let newId;
  let timestamp = moment().format("DD/MM/YYYY HH:mm:ss");
  if (allCart.length === 0) {
    newId = 1;
  } else {
    newId = parseInt(allCart[allCart.length - 1].id) + 1;
  }
  let newCart = {
    id: newId,
    timestamp: timestamp,
    productos: [],
  };
  allCart.push(newCart);
  await cartApi.saveAll(allCart);
  res.send({ id: newId });
});
router.delete("/:id", isAuthenticated, async (req, res) => {
  //Elimina un carrito según su id
  logger.info("DELETE /api/carrito");
  let allCart = await cartApi.getAll();
  const iD = allCart.find(
    (cart) => parseInt(cart.id) === parseInt(req.params.id)
  );

  if (!iD) {
    logger.error("DELETE /api/carrito - Carrito no encontrado");
    res.status(400).json({ error: "Carrito no encontrado" });
  } else {
    await cartApi.deleteById(parseInt(req.params.id));
    allCart = await cartApi.getAll();
    res.send(allCart).status(200);
  }
});

//Products Carts
router.get("/:idcart/prdt", isAuthenticated, async (req, res) => {
  //Devuelve los productos de un carrito segun su id
  logger.info("GET /api/carrito/:idcart/prdt");
  let allCart = await cartApi.getAll();
  const findCart = allCart.find(
    (cart) => parseInt(cart.id) == parseInt(req.params.idcart)
  );
  if (findCart) {
    res.send(findCart.productos).status(200);
  } else {
    logger.error("GET /api/carrito/:idcart/prdt - Carrito no encontrado");
    res.json({ error: "Carrito no encontrado" }).status(400);
  }
});

router.post("/:id/:id_prdt", isAuthenticated, async (req, res) => {
  //Recibe y agrega un producto al carrito asignado
  logger.info("POST /api/carrito/:id/:id_prdt");
  let allCart = await cartApi.getAll();
  const idProduct = req.params.id_prdt;
  const iDCart = allCart.find(
    (cart) => parseInt(cart.id) == parseInt(req.params.id)
  );
  const indexCart = allCart
    .map((cart) => parseInt(cart.id))
    .indexOf(parseInt(req.params.id));

  if (iDCart) {
    let allProducts = await productsApi.getAll();
    const findProduct = allProducts.find(
      (product) => parseInt(product.id) == idProduct
    );

    if (findProduct) {
      allCart[indexCart].productos.push(findProduct);

      await cartApi.saveAll(allCart);
      res
        .send(
          `Producto con ID: ${idProduct} agregado exitosamente al carrito con ID: ${req.params.id}`
        )
        .status(200);
    } else {
      logger.error("POST /api/carrito/:id/:id_prdt - Producto no encontrado");
      res.json({ error: "Ingresar ID del producto" }).status(400);
    }
  } else {
    logger.error("POST /api/carrito/:id/:id_prdt - Carrito no encontrado");
    res.json({ error: "Carrito no encontrado" }).status(400);
  }
});
router.delete("/:id/prdt/:id_prod", isAuthenticated, async (req, res) => {
  //Elimina un producto del carrito por su id de carrito y de producto
  logger.info("DELETE /api/carrito/:id/prdt/:id_prod");
  let allCart = await cartApi.getAll();
  const iDCart = allCart.find(
    (cart) => parseInt(cart.id) === parseInt(req.params.id)
  );
  const indexCart = allCart
    .map((cart) => parseInt(cart.id))
    .indexOf(parseInt(req.params.id));

  if (iDCart) {
    const arrayProd = allCart[indexCart].productos;
    const findProduct = arrayProd.find(
      (producto) => parseInt(producto.id) === parseInt(req.params.id_prod)
    );

    if (req.params.id_prod) {
      if (findProduct) {
        const filterId = arrayProd.filter(
          (item) => parseInt(item.id) !== parseInt(req.params.id_prod)
        );
        allCart[indexCart].productos = filterId;
        await cartApi.saveAll(allCart);
        res.send("Producto eliminado con exito").status(200);
      } else {
        logger.error(
          "DELETE /api/carrito/:id/prdt/:id_prod - Producto no encontrado"
        );
        res.json({ error: "Ingresar ID del producto" }).status(400);
      }
    } else {
      allCart[indexCart].productos = [];
      await cartApi.deleteAll(allCart);
      res.send("Success delete").status(200);
    }
  } else {
    res.json({ error: "Carrito no encontrado" }).status(400);
  }
});

module.exports = router;
