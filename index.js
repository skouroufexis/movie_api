const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const app=express();



const mongoose = require('mongoose');
const models = require('./models.js');

const movies = models.movieModel;
const users = models.userModel;

mongoose.connect('mongodb://localhost:27017/myFlix', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(morgan('common'));
app.use(bodyparser.json());
app.use(express.static('public'));



//routes
app.get('/',function(request,response){

    
    response.sendFile(__dirname+'/index.html');
    response.redirect('/index');
})


app.get('/index',function(request,response){
    
    response.sendFile('index.html',{root:__dirname});
    
})

//retrieve all movies
app.get('/movies',function(request,response){
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
app.get('/movies/:title',function(request,response){
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
app.get('/movies/genres/:name',function(request,response){

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
app.get('/movies/directors/:name/',function(request,response){

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
app.post('/users',function(request,response){    
    let username=request.body.username;
    let password=request.body.password;
    let email=request.body.email;    
    let birthday=request.body.birthday;
    let favourites=request.body.favourites;

    users.create({username:username,password:password,email:email,birthday:birthday,favourites:favourites})
    .then(function(data){
        response.send('new account successfully created');
    }).catch(function(error){
        response.send(error);
    })
    
})

//modify user information
app.put('/users/:id',function(request,response){
    var id = request.params.id;

    let username=request.body.username;
    let password=request.body.password;
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
})
//add movie to user's favourites
app.post('/users/:id/favourites/:movieID',function(request,response){
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
app.put('/users/:id/favourites/:movieID',function(request,response){
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
app.delete('/users/:id',function(request,response){
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


app.listen(8080,function(){
    console.log('running from port 8080');
})
