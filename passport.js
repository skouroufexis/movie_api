
//hashing
const bcrypt = require('bcrypt');

//passport
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
}, function(username, password, callback){
  console.log(username + '  ' + password);
  Users.findOne({ username: username }, function (error, user){
    if (error) {
      console.log(error);
      return callback(error);
    }

    if (!user) {
      console.log('incorrect username');
      return callback(null, false, {message: 'Incorrect username or password.'});
    }
    else
    {
      
      
      if(!bcrypt.compareSync(password,user.password))
        {
          return callback(null, false, {message: 'Incorrect password.'});
        }
      
      
    }


    console.log('finished');
    return callback(null, user);
  });
}));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
}, function(jwtPayload, callback) {
  return Users.findById(jwtPayload._id)
    .then(function(user) {
      return callback(null, user);
    })
    .catch(function(error){
      return callback(error)
    });
}));
