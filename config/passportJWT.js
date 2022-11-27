const passport = require('passport');
const Customer = require('../models/customer');
const Restaurant = require('../models/restaurant');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    Customer.findOne({id: jwt_payload.id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {

            Restaurant.findOne({id: jwt_payload.id}, function(err, user) {

                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                }

            })

            return done(null, false);
            // or you could create a new account
        }
    });
}));


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

module.exports = passport