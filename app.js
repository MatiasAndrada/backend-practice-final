var express = require('express');
var cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('morgan');

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

app.use(logger('dev'));
app.use(express.json());
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

//!ROUTES
//app.use("/", require("./routes/auth.js")(passport));
app.use("/api", require("./routes/info.js"));
//app.use("/api/carrito", require("./routes/carrito"));
//app.use("/api/productos", require("./routes/productos"));

// catch 404 and forward to error handler
app.use("*", (req, res) => {
  res.status(404).send("Recurso no encontrado");
});
//listen
httpServer.listen(3000, () => {
  console.log("Server started on port 3000");
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
