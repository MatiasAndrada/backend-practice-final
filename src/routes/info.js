const router = require("express").Router();
const logger = require("../utils/logger");

router.get("/info", (req, res) => {
  logger.info("Se accedió a la ruta /info con metodo GET");
  res.json({
    "Argumentos de entrada": process.argv,
    "Nombre del sistema operativo": process.platform,
    "Version de Node": process.version,
    "Memoria libre": process.memoryUsage().rss,
    "Path de ejecucion": process.cwd(),
    "Proceso ID": process.pid,
    "Path ejecutable": process.execPath,
  });
});

router.get("/randoms-child-process", (req, res) => {
  logger.info("Se accedió a la ruta /randoms con metodo GET");
  const { cant } = req.query;
  const cantRandoms = cant || 600000000;
  const fork = require("child_process").fork;
  const child = fork("../fork.js");
  child.send(cantRandoms);
  child.on("message", (message) => {
    res.json(message);
  });
});
router.get("/randoms", (req, res) => {
  const { cant } = req.query;
  const cantRandoms = cant || 600000000;
  const randoms = {};
  for (let i = 0; i < cantRandoms; i++) {
    const random = Math.floor(Math.random() * 1000) + 1;
    if (randoms[random]) {
      randoms[random] += 1;
    } else {
      randoms[random] = 1;
    }
  }
  res.json(randoms);
});

module.exports = router;
