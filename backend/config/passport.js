import User from "../models/User.js";
import dotenv from "dotenv";
import passportjwt from "passport-jwt";

// MERN Authentication inspired by: https://github.com/rishipr/mern-auth

dotenv.config();

const JwtStrategy = passportjwt.Strategy;
const ExtractJwt = passportjwt.ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETORKEY;

export default (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
