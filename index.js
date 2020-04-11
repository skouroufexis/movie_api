const express = require('express');
const morgan = require('morgan');
const app=express();
const fs = require('fs');

app.use(morgan('common'));

app.get('/movies',function(request,response){

    response.sendFile('movies.json',{root:__dirname});

});

app.get('/',function(request,response){
    var movie = 
    response.send('Welcome to my top-10 movies');
})

app.use(express.static('public'));



app.listen(8080,function(){
    console.log('running from port 8080');
})