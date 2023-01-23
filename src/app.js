'use strict';
const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const path = require("path");
const loggerDEV = require("morgan");
const logger = require("./logs/logger");


const app = express();
//configuracion de puerto
app.set("port", process.env.APP_PORT || 8080);
const config = require("./config");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(config.dbConfig.mongodb.cnxStr);
const socket = require("socket.io");

// view engine setup
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(loggerDEV("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use("/public", express.static(`${__dirname}/storage/images/avatars`))


//!PASSPORT

// Configuring Passport
const passport = require("passport");
const expressSession = require("express-session");
//Initialize Passport
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

//lister
const server = app.listen(app.get("port"), () => {
  logger.info(`Servidor escuchando en el puerto ${app.get("port")}`);
});

//!SOCKET
const io = socket(server);
io.on("connection", (socket) => {
  console.log("nuevo socket connectado:", socket.id);
  socket.on("change-list", () => {
    console.log("change-list");
    io.sockets.emit("refresh-new-products");
  });
  socket.on("change-list-cart", () => {
    socket.emit("refresh-new-products-cart");
  }); 
});

//!ROUTES
app.use("/", require("./routes/primary"));
app.use("/", require("./routes/auth")(passport));
app.use("/api", require("./routes/info"));
app.use("/api/productos", require("./routes/productos"));
app.use("/api/carrito", require("./routes/carrito"));

// catch 404 and forward to error handler
app.use("*", (req, res) => {
  res.status(404).send("Recurso no encontrado");
});

mongoose.connection.on("connected", () => {
  logger.info(`Conexion a la base de datos exitosa`);
});

//por si hay algun error en la conexion a la base de datos
mongoose.connection.on("error", (error) => {
  logger.error(`Error en la conexion a la base de datos: ${error}`);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
