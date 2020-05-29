const express = require('express');
    const app=express();
    app.use(express.static('public'));

//body-parser
const bodyparser = require('body-parser');
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded());

//passport
const passport = require('passport');

//mongoose & models
const mongoose = require('mongoose');
const models = require('./models.js');
    const movies = models.movieModel;
    const users = models.userModel;

//CORS
const cors = require('cors');

// let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

app.use(cors());

// app.use(cors({
//   origin: (origin, callback) => {
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
//       let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
//       return callback(new Error(message ), false);
//     }
//     return callback(null, true);
//   }
// }));


//hashing
const bcrypt = require('bcrypt');

//validation
const { check, validationResult } = require('express-validator');

//database connection
// mongoose.connect('mongodb://localhost:27017/myFlix', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(CONNECT_URI,{ useNewUrlParser: true, useUnifiedTopology: true });




//authentication

require('./auth.js')(app);



//routes
app.get('/' , function(request,response){
response.redirect('/login');
}
)

app.get('/login',function(request,response){
    response.sendFile(__dirname+'/login.html');
})



app.get('/index', function(request,response){
    
    response.sendFile(__dirname+'/index.html');
    
});






//retrieve all movies
app.get('/movies',passport.authenticate('jwt', {session: false}), function(request,response){
    
    movies.find({},{title:true,"director.name":true,"genre.name":true,
                    description:true,language:true,featured:true,
                    year:true})
    .then(function(data){
        response.send(data);
    }).catch(function(data){
        response.send(data);
    })
});

//retrieve single movie
app.get('/movies/:title',passport.authenticate('jwt', {session: false}), function(request,response){
    var title=request.params.title;
    movies.findOne({title:title},{title:true,"director.name":true,"genre.name":true,
    description:true,language:true,featured:true,
    year:true})
    .then(function(data){
        if(data)
            {
                response.send(data);
            }
        else
            {
                response.send('movie not found');
            }
    }).catch(function(data){
        response.send(data);
    })
    
});

//retrieve single genre
app.get('/movies/genres/:name',passport.authenticate('jwt', {session: false}), function(request,response){

   var genre = request.params.name;
   movies.findOne({'genre.name':genre},{_id:false,"genre.name":true,"genre.description":true})
   .then(function(data){
       if(data)
            {
                response.send(data);
            }
        else
            {
                response.send('genre not found');
            }
   }).catch(function(data){
        response.send(data);
   })

});

//retrieve single director
app.get('/movies/directors/:name/',passport.authenticate('jwt', {session: false}), function(request,response){

   var director = request.params.name;
   movies.findOne({'director.name':director},{_id:false,director:true,})
   .then(function(data){
       if(data)
            {
                response.send(data);
            }
        else
            {
                response.send('director not found');
            }
   }).catch(function(data){
        response.send(data);
   });

});

//add new user
app.post('/users', 

    [
    // username must be an email
    check('username','username must not be blank').not().isEmpty() ,
    check('password','password must not be blank').not().isEmpty(),
    check('email','invalid email format').isEmail()
    ],

    function(request,response){    
        
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
          return response.status(422).json({ errors: errors.array() });
        }
        else
        {

            let username=request.body.username;
            
            let userpass=request.body.password;
            let password= bcrypt.hashSync(userpass,10);

            let email=request.body.email;    
            let birthday=request.body.birthday;
            let favourites=request.body.favourites;

            users.create({username:username,password:password,email:email,birthday:birthday,favourites:favourites})
            .then(function(data){
                response.send('new account successfully created' + data);
            }).catch(function(error){
                response.send(error);
            })

        } 
})

//modify user information
app.put('/users/:id',passport.authenticate('jwt', {session: false}),

    [
    // username must be an email
    check('username','username must not be blank').not().isEmpty() ,
    check('password','password must not be blank').not().isEmpty(),
    check('email','invalid email format').isEmail()
    ],


    function(request,response){

        const errors = validationResult(request);
        if (!errors.isEmpty()) {
          return response.status(422).json({ errors: errors.array() });
        }
        else
        {

            var id = request.params.id;
            let username=request.body.username;
            let password=request.body.password;
    
            bcrypt.hash(password,10).then(function(pass){
                password=pass;
                response.end();
            }).catch(function(error){
                response.send('Error:'+error );
            })
    
            let email=request.body.email;    
            let birthday=request.body.birthday;
        
            users.findOneAndUpdate({_id:id},{$set:{
                username:username,
                password:password,
                email:email,
                birthday:birthday,
            }},{new:true}).then(function(data){
                response.send("user information successfully updated ");
            }).catch(function(data){
            response.send(data);
            })

        }


       
})
//add movie to user's favourites
app.post('/users/:id/favourites/:movieID',passport.authenticate('jwt', {session: false}), function(request,response){
    var id = request.params.id;
    var movie = request.params.movieID;

    //check whether movie already exists in favourites    
    users.findOne({_id:id,favourites:movie})
    .then(function(data){
        if(data)
            {
                response.send('movie already included in favourites')
            }
        else
            {
                    //add the movie to the favourites
                    users.findOneAndUpdate({_id:id},{$push:{favourites:movie}})
                    .then(function(data){
                    response.send('movie successfully added to favourites' + data);
                    }).catch(function(){
                    response.send('oops! an error occured.');
                })      
                
            }
         
    }).catch(function(){
        response.send('oops! An error occured.')
    });
})

//delete movie from user's favourites
app.put('/users/:id/favourites/:movieID',passport.authenticate('jwt', {session: false}), function(request,response){
    var id = request.params.id;
    var movie = request.params.movieID;

    users.findOneAndUpdate({_id:id,favourites:movie},{$pull:{favourites:movie}},{new:true})
    .then(function(data){
        if(data)
            {
                response.send('movie successfully deleted '+data);
            }
        else
            {
                response.send('movie not found');
            }    
        
        
    }).catch(function(data){
        response.send('oops an error occured '+data);
    });


    
})

//delete user
app.delete('/users/:id',passport.authenticate('jwt', {session: false}), function(request,response){
    var id = request.params.id;
    users.findOneAndDelete({_id:id})
    .then(function(data){
        if(!data)
            {
                response.send('user not found');
            }
        else
            {
                response.send('account successfully deleted');
            }    
    })
    
})

app.get('/users/:username/',passport.authenticate('jwt', {session: false}), function(request,response){
    var username=request.params.username;
    var password=request.params.password;
    users.findOne({username:username})
    .then(function(data){
        
        if(!data)
            {
                response.send('username not found')
            }
        else
            {
                if(password!=data.password)
                    {
                        response.send('incorrect password');
                    }
                else
                    {
                        response.send(data);           
                    }    
                
            }    
        });
})

const port = process.env.PORT || 8080;

app.listen(port, '0.0.0.0',function()  {
    console.log('Listening on Port ' + port);
   });
