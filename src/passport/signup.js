const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");
const bCrypt = require("bcryptjs");
const logger = require("../logs/logger");
const Cart = require("../models/cart.model");
module.exports = function (passport) {
  passport.use(
    "signup",
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      function (req, username, password, done) {
        findOrCreateUser = function () {
          // find a user in Mongo with provided username
          User.findOne({ username: username }, function (err, user) {
            // In case of any error return
            if (err) {
              logger.error(`Error: ${err}`);
              return done(err);
            }
            // already exists
            if (user) {
              logger.warn("User already exists");
              return done(
                null,
                false,
                req.flash("message", "User Already Exists")
              );
            } else {
              // if there is no user with that email
              // create the user
              var newUser = new User();
              // set the user's local credentials

              newUser.username = username;
              newUser.password = createHash(password);
              newUser.email = req.body.email;
              newUser.firstName = req.body.firstName;
              newUser.lastName = req.body.lastName;
              newUser.age = req.body.age;
              newUser.country = req.body.country;
              newUser.city = req.body.city;
              newUser.address = req.body.address;
              newUser.phone = req.body.phone;

              newUser.setAvatarUrl(req.file.filename);

              // create a new cart for the user
              var newCart = new Cart();
              newCart.owner = newUser._id;
              newCart.save(function (err) {
                if (err) {
                  logger.error(`Error: ${err}`);
                  throw err;
                }
                logger.info("Cart created");
              });
              

              // save the user
              newUser.save(function (err) {
                if (err) {
                  logger.error(`Error: ${err}`);
                  throw err;
                }
                logger.info("User Registration succesful");
                return done(null, newUser);
              });
            }
          });
        };

        // Delay the execution of findOrCreateUser and execute
        // the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
      }
    )
  );

  // Generates hash using bCrypt
  var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };
};
