const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const app=express();
const movies = require('./movies.js');
const genres = require('./genres.js');
const directors=require('./directors.js');


app.use(morgan('common'));
app.use(bodyparser.json());

//routes
app.get('/',function(request,response){
    
    response.send('Welcome to my top-10 movies');
})


app.get('/index',function(request,response){
    
    response.sendFile('index.html',{root:__dirname});
    
})

//retrieve all movies
app.get('/movies',function(request,response){
    response.json(movies);
});

//retrieve single movie
app.get('/movies/:title',function(request,response){
    let movie = movies.find(function(data){
        return data.title.toLowerCase()===request.params.title.toLowerCase();
    })
    if(movie)
        {
            response.json(movie);
            
        }
    else
        {
            response.send('movie not found!');
        }
    
    
});

//retrieve single genre
app.get('/genres/:name',function(request,response){

    let genre = genres.find(function(data){
        return data.name.toLowerCase()===request.params.name.toLowerCase();
    })
    if(genre)
        {
           response.json(genre);
        }
    else
        {
            response('genre not found!');
        }

});

//retrieve single director
app.get('/directors/:name/',function(request,response){

    let director = directors.find(function(data){
        return data.name.toLowerCase()===request.params.name.toLowerCase();
    })
    if(director)
        {
           response.json(director);
        }
    else
        {
            response('director not found!');
        }

});

//add new user
app.post('/users',function(request,response){    
    //control if all required data are present
    //add the new user
    response.send('successfully added new user')
})

//modify user information
app.put('/users/:id',function(request,response){
    //control if the user id is present in the users table/object
    //update that user's information
    response.send('User information successfully updated');
})

//add movie to user's favourites
app.post('/users/:id/favourites/:movieID',function(request,response){
    //code to add new movie
    response.send('movie successfully added to favourites');
})

//delete movie from user's favourites
app.delete('/users/:id/favourites/:movieID',function(request,response){
    //find and delete movie from favourites
    response.send('movie successfully removed from favourites');
})

//delete user
app.delete('/users/:id',function(request,response){
    //code to delete user
    response.send('account successfully deleted');
})

app.use(express.static('public'));

app.use(function(err,request,response,next){
    console.error(err.stack);
    response.status(500).send('oops, an error occured');
})


app.listen(8080,function(){
    console.log('running from port 8080');
})