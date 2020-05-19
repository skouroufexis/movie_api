

// const express = require('express');
// const app=express();
// app.use(express.static('public'));


// const passport = require('passport');
// let jwt=require('jsonwebtoken');
// let jwtSecret = 'your_jwt_secret';
// require('./passport');


// let generateToken= function(user) {
//   return jwt.sign(
//                   user,jwtSecret,
//                   {subject:user.username,
//                    expiresIn:'7d',
//                    algorithm:'HS256'   
//                   }
//                 );
// }


// module.exports=function(router){

//   app.use(passport.initialize());
  
//   router.post('/login',function (request,response){

//     passport.authenticate('local',{ session:false},function(err,user,info){
      
//       if(err)
//         {
//           console.log(err);
//           response.send(JSON.stringify({error:err}))    
//         }
      
//       else
//         {
//           if(!user)
//           {
//             response.send(JSON.stringify({user:null,message:info.message,redirect:null}));
//           }
//         else
//           {
//             let token = generateToken(user.toJSON());
            
//             console.log(user);
            
//             return response.json({user:user, token:token});
            
//           }   
//         }

//     })(request,response);    
//   });

// }

const jwtSecret = 'your_jwt_secret'; // This has to be the same key used in the JWTStrategy

const jwt = require('jsonwebtoken'),
  passport = require('passport');

require('./passport'); // Your local passport file


let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.username, // This is the username you’re encoding in the JWT
    expiresIn: '7d', // This specifies that the token will expire in 7 days
    algorithm: 'HS256' // This is the algorithm used to “sign” or encode the values of the JWT
  });
}


/* POST login. */
module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
}




