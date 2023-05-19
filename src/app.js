"use strict";
const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const path = require("path");
const loggerDEV = require("morgan");
const logger = require("./utils/logger");

const app = express();
//!configuración de puerto
const config = require("./config");
app.set("port", config.appConfig.port);
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(config.dbConfig.mongodb.cnxStr);

const socket = require("socket.io");

//!view engine setup
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(loggerDEV("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
//avatar images
app.use("/public", express.static(`${__dirname}/storage/images/avatars`));

//!PASSPORT
const passport = require("passport");
const expressSession = require("express-session");
const initPassport = require("./passport/init");
initPassport(passport);
//Use the session middleware
app.use(
  expressSession({
    secret: "shhhhhhhhhhhhhhhhhhhhh",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
const flash = require("connect-flash");
app.use(flash());
//!listen
const server = app.listen(app.get("port"), () => {
  logger.info(`Servidor escuchando en el puerto ${app.get("port")} con el enlace http://localhost:${app.get("port")}`);
});

const db = mongoose.connection;
db.on("error", (err) => {
  logger.error(err);
});
db.once("open", () => {
  logger.info("Conectado a la base de datos");
});

//!SOCKET.IO
const messages = [{
  message: "hola",
  user: "Admin",
  date: "021-05-01T21:09:47.000Z"
}];
const io = socket(server);
io.on("connection", (socket) => {
  socket.on("change-list", () => {
    io.sockets.emit("refresh-new-products");
  });
  socket.on("change-list-cart", () => {
    socket.emit("refresh-new-products-cart");
  });

  socket.on("new-chat-message", (message) => {
    messages.push(message);
    io.sockets.emit("refresh-message", messages);
  });
  socket.on("refresh-message", () => {
    io.sockets.emit("refresh-message", messages);
  });
});

/* //!ERRORHANDLER MIDDLEWARE
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler); */
//!AUTH MIDDLEWARE
/* const auth = require("./middleware/auth");
app.use(auth); */

app.use("/", require("./routes/auth")(passport));
//!ROUTES
app.use("/", require("./routes/primary"));
app.use("/api", require("./routes/info"));
app.use("/api/product", require("./routes/product"));
app.use("/api/cart", require("./routes/cart"));
app.use("/messages", require("./routes/messages"));

module.exports = app;
