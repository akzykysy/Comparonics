var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

//CONFIGURING A LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
  	//search MongoDB for user with supplied email address
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      //if no user is found, return false and a message
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      //call validPassword method, passing supplied password
      if (!user.validPassword(password)) {
      	//if password is incorrect, return false and a message
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      //we can return user object
      return done(null, user);
    });
  }
));