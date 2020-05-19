// const models = require('./models.js');
//     const movies = models.movieModel;
//     const users = models.userModel;


// const passport = require('passport');
// const local = require('passport-local').Strategy;
// const jwtStrategy = require('passport-jwt').Strategy;
// ExtractJWT=require('passport-jwt').ExtractJwt;

// passport.use(new local(function(username,password,done){
//     users.findOne({username:username},function(err,user,info){
//       if(err)
//         {
//           return done(err);
//         }
//       if(!user)
//         {
//           return done(null,false,{message:'username not found'});
//         }  
//       else
//         {
//           if(user.password!=password)
//             {
//               console.log('incorrect password');
              
//               return done(null,false,{message:'incorrect password'});
              
//             }
//           else
//             {
//               return done(null,user);
//             }  
//         }  
//     });  
//   }));


//   passport.use(new jwtStrategy ({
//     jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken() ,
//     secretOrKey: 'your_jwt_secret'
//   }, function (jwtPayload, callback) {
//     return users.findById(jwt_payload._doc.id)
//       .then(function (user)  {
//         return callback(null, user);
//       })
//       .catch(function(error) {
//         return callback(error)
//       });
//   }));

const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');

let Users = Models.userModel,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, (username, password, callback) => {
  console.log(username + '  ' + password);
  Users.findOne({ username: username }, (error, user) => {
    if (error) {
      console.log(error);
      return callback(error);
    }

    if (!user) {
      console.log('incorrect username');
      return callback(null, false, {message: 'Incorrect username or password.'});
    }

    console.log('finished');
    return callback(null, user);
  });
}));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
  return Users.findById(jwtPayload._id)
    .then((user) => {
      return callback(null, user);
    })
    .catch((error) => {
      return callback(error)
    });
}));
