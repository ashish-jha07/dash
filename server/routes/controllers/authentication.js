const jwt = require('express-jwt');
const getTokenFromHeaders = (req) => {
    const { headers: { authorization } } = req;
  
    if(authorization && authorization.split(' ')[0] === 'Token') {
      return authorization.split(' ')[1];
    }
    return null;
  };
  
  const auth = {
    required: jwt({
      secret: 'secret',
      userProperty: 'payload',
      getToken: getTokenFromHeaders,
    }),
    optional: jwt({
      secret: 'secret',
      userProperty: 'payload',
      getToken: getTokenFromHeaders,
      credentialsRequired: false,
    }),
  };
  
  module.exports = auth;

















































// var passport = require('passport');
// var mongoose = require('mongoose');
// var User = require('../../Model/user');


// module.exports.register = function(req, res) {
//     var user = new User();
  
//     user.name = req.body.name;
//     user.email = req.body.email;
  
//     user.setPassword(req.body.password);
  
//     user.save(function(err) {
//       var token;
//       token = user.generateJwt();
//       res.status(200);
//       res.json({
//         "token" : token
//       });
//     });
//   };


//   module.exports.login = function(req, res) {

//     // if(!req.body.email || !req.body.password) {
//     //   sendJSONresponse(res, 400, {
//     //     "message": "All fields required"
//     //   });
//     //   return;
//     // }
  
//     passport.authenticate('local', function(err, user, info){
//       var token;
  
//       // If Passport throws/catches an error
//       if (err) {
//         res.status(404).json(err);
//         return;
//       }
  
//       // If a user is found
//       if(user){
//         token = user.generateJwt();
//         res.status(200);
//         res.json({
//           "token" : token
//         });
//       } else {
//         // If user is not found
//         res.status(401).json(info);
//       }
//   })(req, res);

// };


  