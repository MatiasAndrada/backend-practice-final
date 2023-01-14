const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const loggerDEV = require("morgan");
const logger = require("./logs/logger");

//

const app = express();
app.set("port", process.env.PORT || 8080);
const dbConfig = require("./config");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(dbConfig.mongodb.cnxStr);
/* const http = require("http");
const httpServer = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(httpServer);
 */
const socket = require("socket.io");

// view engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(loggerDEV("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

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
console.log("PUERTO", app.get("port"))
const server = app.listen(app.get("port"), () => {
  logger.info(`Servidor escuchando en el puerto ${app.get("port")}`);
});

//!SOCKET
const io = socket(server);
io.on("connection", (socket) => {
  console.log("nuevo socketc conectado");
  socket.emit("server to client");
  socket.on("client to server", () => {
    console.log("client to server");
  });
  /*   console.log("nuevo socket connectado:", socket.id);
  console.log(socket.handshake.url);
  const emitPrdt = async () => {
    const prdt = await fetch("api/productos");
    console.log("fetch 0");

    console.log(prdt);
    console.log("fetch 1");
    //socket.emit("refresh-new-products", prdt);
  };
  emitPrdt() 

  socket.on("change-list", () => {
    console.log("change-list");
    io.sockets.emit("refresh-new-products");
  });
  socket.on("change-list-cart", (idCart) => {
    socket.emit("refresh-new-products-cart", idCart);
  }); */
});

//!ROUTES
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
