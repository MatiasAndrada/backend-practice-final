/* ------------------ PASSPORT -------------------- */
const passport = require("passport");
const UserDto = require("../dto/UserDto")
const { Strategy: LocalStrategy } = require("passport-local");

const usuarios = [];
passport.use(
    "register",
    new LocalStrategy(
        {
            passReqToCallback: true,
        },
        (req, username, password, done) => {
            const { direccion } = req.body;

            const usuario = usuarios.find((usuario) => usuario.username == username);
            if (usuario) {
                return done("already registered");
            }

            const user = {
                username,
                password,
                direccion,
            };
            usuarios.push(user);

            //return dto
            const userDto = new UserDto(user);
            return done(null, userDto);
        }
    )
);

passport.use(
    "login",
    new LocalStrategy((username, password, done) => {
        const user = usuarios.find((usuario) => usuario.username == username);

        if (!user) {
            return done(null, false);
        }

        if (user.password != password) {
            return done(null, false);
        }

        user.contador = 0;

        //return dto
        const userDto = new UserDto(user);
        return done(null, userDto);
    })
);

passport.serializeUser(function (user, done) {
    done(null, user.username);
});

passport.deserializeUser(function (username, done) {
    const usuario = usuarios.find((usuario) => usuario.username == username);
    done(null, usuario);
});

module.exports = passport;