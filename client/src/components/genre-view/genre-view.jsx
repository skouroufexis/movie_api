import React, {useState} from 'react';
import {Header} from '../header/header';
import axios from 'axios';
import './genre-view.scss';
let Genre = function(props){
    //get genre name & token

    const [genreDescription, setGenre] = useState('');

    let movie=localStorage.getItem('selected');
        movie=JSON.parse(movie);


    let genre_name=movie.genre.name;
    let path ='https://stavflix.herokuapp.com/movies/genres/'+ genre_name;
    let token = localStorage.getItem('token');
    

    axios.get(path,{headers: { Authorization: `Bearer ${token}`}})
    .then(function(response){
        let data=response.data;
        setGenre(response.data.genre.description);
         
    })
    .catch(function(response){
        console.log(response);
    })

    return(

        <div className='container genre_main' >
            <div className='container genre_container'>
                <div className='row genre_row genre_name'>
                    <div className='col col-12 genre_col'><h1>{genre_name}</h1></div>
                    </div>
                    <p className='col-12 genre_p'>{genreDescription}</p>

                <div className='row genre_row'>
                    <div className='col col-12 genre_col'>
                        <h5>Movies the same genre</h5>
                    </div>
                </div>

                <div className='row genre_row'>
                    {findMovies()}
                </div>

                <div className='row genre_row'>
                    
                <div className='col-5'></div>
                    <button className='col-5 genre_back' onClick={()=>back()}>Back</button> 
                    
                    
                </div>


            </div>
        </div>

    )

function back(){
    //get movie id
    let movie=localStorage.getItem('selected');
    movie=JSON.parse(movie);
    let movie_id=movie._id;
    let path ='http://localhost:1234/movies/'+movie_id;
    window.location.replace(path);
}



function findMovies(){
    let c;
    let m=props.movies;
    
    let l =m.length;
    let titles=[];
    let movs=[]; //movies to return

    for(c=0;c<l;c++)
        {
            
            if (m[c].genre.name==genre_name)
                {
                    titles.push(m[c]);
                    
                }
        }    

        l=titles.length;


        for(c=0;c<l;c++)
        {
            let n =c;
            movs[c]=<div className='col-12 director_col link button' onClick={()=>{redirect(n,titles[n])}} >{titles[c].title}</div>
            console.log(titles[c].title);
        }    

        return <div className='col-12 director_col'>{movs}</div> ;

}

function redirect(path,newSelectedMovie){
        
    //set new selected movie in localStorage
    localStorage.setItem('selected',JSON.stringify (newSelectedMovie));

    //redirect to the new selected movie
    
     path ='http://localhost:1234/movies/'+path;
     window.location.replace(path);
}


}


export{Genre};