var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../../Model/user');
// const LocalStrategy = require('passport-local');

// passport.use(new LocalStrategy({
  
//   email: 'email',
//   password: 'password',
// }, (email, password, done) => {
//   User.findOne({ email })
//     .then((user) => {console.log('validation run'+ user);
//       // console.log('shaym')
//       if(!user || !user.validPassword(password)) {
//         return done(null, false, { errors: { 'email or password': 'is invalid' } });
//       }
//       // Console.log(user +" passport ");

//       return done(null, user);
//     }).catch(done);
// }));



passport.use(
  new LocalStrategy({ usernameField: 'email' },
  (username, password, done) => {
  User.findOne({ email: username },
  (err, user) => {
  if (err) {
  return done(err)
  }
  //unknown user
  else if (!user) {
  return done(null, false, { message: "unknown user" +console.log('unkwon user email')})
  }
  //wrong password
  else if (!user.validPassword(password)) {
  // console.log(user)
  return done(null, false, { message: "wrong password" + console.log('wrong pass')})
  }
  else {
    var token;
    token = user.generateJwt();
    //res.status(200);

  
  return done(null, token )
  }
  })
  })
  )
// passport.use(new LocalStrategy(
//   function(email, password, done) {
//     User.findOne({ username: email }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.validPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));


// function(username, password, done) {
//   User.findOne({ email: username }, function (err, user) {
//     if (err) { return done(err); }
//     // Return if user not found in database
//     if (!user) {
//       return done(null, false, {
//         message: 'User not found'
//       });
//     }
//     // Return if password is wrong
//     if (!user.validPassword(password)) {
//       return done(null, false, {
//         message: 'Password is wrong'
//       });
//     }
//     // If credentials are correct, return the user object
//     return done(null, user);
//   });
// }