var express = require('express');
var cookieParser = require('cookie-parser');
var path = require('path');
var loggerDEV = require('morgan');
var logger = require("./logs/logger");

//
const { Server: HtppServer } = require("http");
const { Server: IOServer } = require("socket.io");
const dbConfig = require("./config");
const mongoose = require("mongoose");

var app = express();

//
mongoose.set("strictQuery", false);
mongoose.connect(dbConfig.mongodb.cnxStr);
const httpServer = new HtppServer(app);
const io = new IOServer(httpServer);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(loggerDEV('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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

//!ROUTES
app.use("/", require("./routes/auth")(passport));
app.use("/api", require("./routes/info"));
//app.use("/api/productos", require("./routes/productos"));
//app.use("/api/carrito", require("./routes/carrito"));

// catch 404 and forward to error handler
app.use("*", (req, res) => {
  res.status(404).send("Recurso no encontrado");
});

//socket.io
io.on("connection", (socket) => {
  socket.on("change-list", () => {
    io.sockets.emit("refresh-new-products");
  });
  socket.on("change-list-cart", (idCart) => {
    io.sockets.emit("refresh-new-products-cart", idCart);
  });
});

//lister
app.listen(5001, () => {
  logger.info("Servidor escuchando en el puerto 5001");
});

mongoose.connection.on("connected", () => {
  logger.info(`Conexion a la base de datos exitosa`);
});

//por si hay algun error en la conexion a la base de datos
mongoose.connection.on("error", (error) => {
  logger.error(`Error en la conexion a la base de datos: ${error}`);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
