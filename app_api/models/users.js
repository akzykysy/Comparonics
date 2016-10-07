//authentication
var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  //email should be required and unique
  email: {
    type: String,
    unique: true,
    required: true
  },
  //Name is also required, but not necessarily unique
  name: {
    type: String,
    required: true
  },
  //Hash and salt are both just strings
  hash: String,
  salt: String
});


userSchema.methods.setPassword = function(password){
  //Create a random string for salt
  this.salt = crypto.randomBytes(16).toString('hex');
  //Create encrypted hash
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000,
  64).toString('hex');
};

//validating a submitted password
userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

//Create a schema method to generate a JWT
userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.JWT_SECRET);
};