/*
Luego implementar loggueo (con alguna librería vista en clase) que registre lo siguiente:
Ruta y método de todas las peticiones recibidas por el servidor (info)
Ruta y método de las peticiones a rutas inexistentes en el servidor (warning)
Errores lanzados por las apis de mensajes y productos, únicamente (error)
Considerar el siguiente criterio:
Loggear todos los niveles a consola (info, warning y error)
Registrar sólo los logs de warning a un archivo llamada warn.log
Enviar sólo los logs de error a un archivo llamada error.log
 */

const winston = require("winston");
const { format } = require("winston");
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), myFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "./warn.log", level: "warn" }),
    new winston.transports.File({ filename: "./error.log", level: "error" }),
  ],
});

module.exports = logger;
