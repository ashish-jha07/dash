var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var schema = mongoose.Schema;

var userSchema = new schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
      },
     hash: String,
     salt: String,
     resetPasswordToken: String,
     imagePath: Object,
    
}); 

//bcrypt password
userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    console.log('bcrypt password');
  };
//checking password
  userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    // console.log('bcrypt password check'+ this.hash === hash);
    // return this.hash == hash;
    if(this.hash === hash){
      // console.log("in if")
      return true;
    }
    else{
      // console.log("in else")
      return false
    }
    
  };

  userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
  };

  


  // userSchema.methods.toAuthJSON = function() {
  //   return {
  //     _id: this._id,
  //     email: this.email,
  //     token: this.generateJWT(),
  //   };
  // };
  

module.exports = mongoose.model('user', userSchema, 'users');
    