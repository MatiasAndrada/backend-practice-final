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
    new winston.transports.File({ filename: "./logs/warn.log", level: "warn" }),
    new winston.transports.File({ filename: "./logs/error.log", level: "error" }),
  ],
});

module.exports = logger;
