const passport = require('passport');
const Customer = require('../models/customer');
const Restaurant = require('../models/restaurant');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'my_key';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    Customer.findOne({id: jwt_payload.id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {

            console.log('the id', jwt_payload.id)
            Restaurant.findById(jwt_payload.id, function(err, user) {

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




module.exports = passport