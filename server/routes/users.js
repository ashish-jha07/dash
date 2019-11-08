var express = require('express');
var router = express.Router();
var User = require('../Model/user');
var jwt = require('express-jwt');
var async = require("async");
var assert = require('assert');
var checkAuth = require('./../midleware/check-auth');

const mongoose = require('mongoose');
const passport = require('passport');
require('../routes/config/passport');
const nodemailer = require('nodemailer');
const multer = require('multer');
const bcrypt = require('bcrypt');
var ctrlProfile = require('../routes/profile');
var auth = require('../routes/controllers/authentication');

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});
let saltRounds = 16;
let myString = 'Qwety521@'

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};
var upload = multer({ dest: 'uploads/files' })
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/public/images/uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })




router.post('/Search', (req,res,next) => {
  console.log(req.body)
  var filterName = req.body.name;
  console.log(filterName);
  var filterQuery = {
    name: filterName
  }
    User.find(filterQuery).then( (err,data)=> {
     if(data)
      res.json({"data":data})
      else res.json({"not found data":err})
      
    }).catch(err=> res.json({"error":err}))





//     User.find({},{},query,function(err,data) {
//       // Mongo command to fetch all data from collection.
//     if(err) {
//         response = {"error" : true,"message" : "Error fetching data"};
//     } else {
//         var totalPages = Math.ceil(totalCount / size)
//         response = {data , totalPages};
//     }
//     res.json(response);
//     res.end();
//  });
})

 



router.post('/fileUpload/', upload.single("files"), (req, res, next) => {
  console.log('image upload api call')
  //let url = req.protocol + '://'+ req.get("host");
 // console.log(url +'/'+req.file.filename)
//  console.log(req.file.path)
  // console.log(file)
    // console.log(req.file)

    // User.findById({ _id: req.params.id }, (err, doc) => {
    //   if (err) {console.log("errin find by id")}
    //   else {
    //   let imageData
    let imageData = { 'fileName': req.file.originalname, 'filePath': req.file.path }
    //   console.log(imageData)
    //   User.findByIdAndUpdate({ _id: req.params.id }, { $set: { imagePath: imageData } }, (err, doc) => {
    //     console.log(req.params.id)
    //     console.log(doc + 'find by id and upadte ')
    //   if (err) { console.log("err in findbyid and update"); res.json("err")}
    //   else {res.json({'img': imageData})}
    //   });
    //   }
     
    //   }).catch(err => res.json("err"))
      
      // insertDocuments(db, '/tmp/my-uploads' + req.file.filename, () => {
          // res.json({'message': 'File uploaded successfully'});
          
      // });
      res.json({'data':imageData,'status':1,'message': 'File uploaded successfully'});
  })  

// businessRoutes.route('/delete/:id').get(function (req, res) {
//   Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
//       if(err) res.json(err);
//       else res.json('Successfully removed');
//   });
// });
router.delete('/delete/:id', (req,res)=>{

  User.findByIdAndRemove({_id: req.params.id}, function(err, business){
    if(err) res.json("err");
    else res.json('Successfully removed');
}).catch(err => res.json("err"));
})


// userRoutes.route('/edit/:id').get(function (req, res) {
//   var id = req.params.id;
//   User.findById(id, function (err, user){
//       res.json(user);
//   });
// });


router.get('/edit/:id', (req,res)=>{
  var id = req.params.id;
  User.findById(id, function (err, user){
      if(user){res.json(user)}
      if(err){
        res.json("err"+ err)
      }
      
  
})
});



  router.post('/update/:id', (req,res) => {
    console.log('update api call')

    console.log('sfds',req.body )
  User.findById(req.params.id, function(err, user) {
   if (!user)
   {
     return next(new Error('Could not load Document'));
   }
   else {
    //  Data:{
    //   user.name = req.body.name;
    //   user.email = req.body.email;
    //  }
    User.findByIdAndUpdate({ _id : req.params.id }, { $set: { name: req.body.name , email: req.body.email, imagePath: req.body.imagePath}},
      function(err, model) {
      if (err) {
         
          return res.json(err);
      }
      res.json({'userupdated': model})
  }

    ).catch(err => res.json("err"))
    
    //  user.save()
    //  .then(user => {
    //      res.json('Update complete');
    //  })
    //  .catch(err => {
    //        res.status(400).send("unable to update the database");
    //  });
   }
 });
});







router.get('/',function (req, res)  {
  
  var pageNo = parseInt(req.query.pageNo)
  var size = 2
  var query = {}
  if(pageNo < 0 || pageNo === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size
  // Find some documents
       User.count({},function(err,totalCount) {
             if(err) {
               response = {"error" : true,"message" : "Error fetching data"}
             }
         User.find({},{},query,function(err,data) {
              // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                var totalPages = Math.ceil(totalCount / size)
                response = {data , totalPages};
            }
            res.json(response);
            res.end();
         });
       })
});
//   User.find(function (err, userdata){
//    if(err){
//      console.log(err);
//    }
//    else {
//      res.json(userdata);
//    }
//  });




router.post('/add', (req, res, next) => {
  const user = req.body;
  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new User(user);
  console.log(user)
  finalUser.setPassword(user.password);

   finalUser.save()
    .then((err, data) => {
      if(err){
        if(err.code==11000){
          res.json('email already exist');
        }
        }
      
      res.json({user})}).catch((err)=>  res.json({serverErrorDublicateEmail: "The email address is already subscribed. Please try to use another one or simply Log in"}));
});
//POST login route (optional, everyone has access)
// router.post('/login', (req, res, next) => {
//   const user = req.body;
//   console.log(user);
//   if(!user.email) {
//     return res.status(422).json({
//       errors: {
//         email: 'is required',
//       },
//     });
//   }

//   if(!user.password) {
//     return res.status(422).json({
//       errors: {
//         password: 'is required',
//       },
//     });
//   }
//   console.log('ram')
//   return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    
//     if(err) {
      
//       return next(err);
//     }
//     console.log('shaym')
//     if(passportUser) {
//       const user = passportUser;
//       // user.token = passportUser.generateJWT();
//       console.log(user)
//       return res.json({ user });
//     }

//     return status(400).info;
//   })(req, res, next);
// });
router.post('/login',  (req, res, next) => {
  const user =req.body;
console.log(user)
  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  passport.authenticate('local', function(err, user, info) {
    // console.log(user+ 'passport login');
    if (err) { return next(err); }
    if (!user) { return res.json({err:'password and email not match'}); }
    if(user) { return res.json({'token': user});}
    
    return status(400).info;

  })(req, res, next);

  
  
});


router.post('/forget-pass',(req, res, next) => {
  // console.log('forget pass api call')
  var token;
  
  // https://getnada.com/
  const user = req.body;

  
  const find = async () => {
    try {
      const item = await User.findOne({email: user.email})
      if(item == null || undefined){
        res.json ({err: 'user not found'});
      } 
      else{
        token = item.generateJwt();
        item.resetPasswordToken = token;
        console.log('item data in forget '+ item)
        item.save().then((err,data)=> {if(err){console.log(err)} else {console.log('data')}})
        let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 25,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'testingbydev@gmail.com', // generated ethereal user
            pass: 'Dev@1234567'  // generated ethereal password
        },
        tls:{
          rejectUnauthorized:false
        }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: 'testingbydev@gmail.com', // sender address
      to: 'sohewydi@getnada.com', // list of receivers
      subject: 'Forget your Password', // Subject line
      text: 'Hello world?', // plain text body
      html: '<p>Click <a href="http://localhost:4200/auth/resetPasword/' + token + '">here</a> to reset your password</p>'
      // html body
  };
     
        
      transporter.sendMail(mailOptions, (error, info) => {
              // console.log(item)
    
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);   
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
          // res.render('contact', {msg:'Email has been sent'});
          res.json( user)
      });
    }
      // console.log(item)
    } catch{err => {
    console.error(err)
    }
  }
}

  
  find()

  

  // send mail with defined transport object
  
  

});


router.post('/reset-pass',(req,res,next) =>
{
  console.log('reset api call')
const Userdata = req.body;
console.log()
async.waterfall([
  function(done) {
    User.findOne({ resetPasswordToken: Userdata.token }, function(err, user) {
      console.log('in mongo')
      if (!user) {
        res.json({err:'Password reset token is invalid or has expired.'});
      }
     if(user !== null || undefined)
     {
      if(Userdata.data.password == Userdata.data.confirmPassword) {
        user.setPassword(Userdata.data.password);
      
        // function(err) {
          user.resetPasswordToken = undefined;
          console.log('password match ');
          console.log(user + ' user data in reset')
          user.save().then((err,data)=> {if(err){console.log(err) }else {console.log(data + 'user data save') }})
          res.json('your password changed')
        }
       else {
          res.json('password do not match')
      }
    }});
  },
//   function(user, done) {
//     console.log('in node mailer reset')
//     let smtpTransport = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//     port: 25,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: 'testingbydev@gmail.com', // generated ethereal user
//         pass: 'Dev@1234567'  // generated ethereal password
//     },
//     tls:{
//       rejectUnauthorized:false
//     }
//     });
//     let mailOptions = {
//       //to : user.email here we dont have real email
//       from: 'testingbydev@gmail.com', // sender address
//       to: 'sohewydi@getnada.com', // list of receivers
//       subject: 'Your password has been changed',
//       text: 'Hello,\n\n' +
//         'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
//     };
//     smtpTransport.sendMail(mailOptions, (error, info) => {
//       // console.log(item)

//   if (error) {
//       return console.log(error);
//   }
//   console.log('Message sent: %s', info.messageId);   
//   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//   // res.render('contact', {msg:'Email has been sent'});
//   // res.json( user.email)
// });
//   }

], function(err) {
  res.json('err');
}); 
});




 

// router.post('/fileUpload', upload.single('image'), (req, res, next) => {
//   res.json('gekki');
//   // console.log('asdfsd')
//   // var file = req.file;
//   // if (!file) {
//   //   const error = new Error('Please upload a file')
//   //   error.httpStatusCode = 400
//   //   return next(error)
//   // }
//   //  res.json('file upload') 
  
// });



// router.post('/fileUpload', upload.single('image'), (req, res, next) => {
//     console.log('adsflkjsadflkj')
//       // insertDocuments(db, '/tmp/my-uploads' + req.file.filename, () => {
//           res.json({'message': 'File uploaded successfully'});
//       // });
//   })  ;


// var insertDocuments = function(db, filePath, callback) {
//   var collection = db.collection('user');
//   collection.insertOne({'imagePath' : filePath }, (err, result) => {
//       // assert.equal(err, null);
//       callback(result);
//   });
// }

// USER PROFILE
// router.get("/users/:id", function(req, res) {
// User.findById(req.params.id, function(err, foundUser) {
//   if(err) {
//     req.flash("error", "Something went wrong.");
//     res.redirect("/");
//   }
//   Campground.find().where('author.id').equals(foundUser._id).exec(function(err, campgrounds) {
//     if(err) {
//       req.flash("error", "Something went wrong.");
//       res.redirect("/");
//     }
//     res.render("users/show", {user: foundUser, campgrounds: campgrounds});
//   })
// });





// });






























  // passport.authenticate('local', function(err, user, info) {
  //   if (err) { return next(err); }
  //   if (!user) { return res.json('dont have creditional'); }
  //   if(user){
  //     return res.json('sucessfully login');
  //   }
  //   // req.logIn(user, function(err) {
  //   //   console.log(user);
  //   //   if (err) { return next(err); }
  //   //   return res.json('sucess full login'+user.name);
  //   // });
  // })



// app.get('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/users/' + user.username);
//     });
//   })(req, res, next);
// });
//   passport.authenticate('local',  (err, passportUser, info) => {
    
//     if(err) {
//       return next(err);
//     }

//     if(passportUser) {
//       console.log('ram')
//       const user = passportUser;
//       // user.token = passportUser.generateJWT();

//       return res.json({ user: user.toAuthJSON() });
//     }

//     return status(400).info;
//   })(req, res, next);
// });
// //GET current route (required, only authenticated users have access)
// router.get('/current',  (req, res, next) => {
//   const  id  = req.body;

//   return Users.findById(id)
//     .then((user) => {
//       if(!user) {
//         return res.sendStatus(400);
//       }

//       return res.json({ user: user.toAuthJSON() });
//     });
// });

module.exports = router;


// router.post('/add', function(req,res){
//   console.log(req.body);
//   var user = new User(req.body);
//   var name= user.name;
//   var password = user.password;
//   bcrypt.hash(password, saltRounds, (err, hash) =>  {
//     // Store hash in your password DB.
//     if(!err)
//     console.log(hash)
//     else
//     console.log('Error '+ err);
//   });
//   console.log(user.data); 
//    user.save()
//     .then(item => {
//     res.status(200).json({'user': 'user added successfully'});
//     })
//     .catch(err => {
//     res.status(400).send("unable to save to database");
//     });
// });




/* GET users listing. */
  // router.post('/add', function(req, res, next) {
  //   // res.json('respond with a resource');
  //   var user = new User(req.body);
  //    
  //      user.save()
  //       .then(item => {
  //       res.status(200).json({'user': 'user added successfully'});
  //       })
  //       .catch(err => {
  //       res.status(400).send("unable to save to database");
        
  // });
  
    
//   router.get('/profile', auth, ctrlProfile.profileRead);



  
