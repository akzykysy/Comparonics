var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {
  if(!req.body.name || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      //Respond with an error status if not all required fields are found
      "message": "All fields required"
    });
    return;
  }
  //Create a new user instance and set name and email
  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  //Use setPassword method to set salt and hash
  user.setPassword(req.body.password);
  //Save new user to MongoDB
  user.save(function(err) {
  	//Generate a JWT using schema method and send it to browser
    var token;
    if (err) {
      sendJSONresponse(res, 404, err);
    } else {
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        "token" : token
      });
    }
  });
};

module.exports.login = function(req, res) {
  if(!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }
  passport.authenticate('local', function(err, user, info){
    var token;
    if (err) {
      sendJSONresponse(res, 404, err);
      return;
    }
    if(user){
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        "token" : token
      });
    } else {
      sendJSONresponse(res, 401, info);
    }
  })(req, res);
};