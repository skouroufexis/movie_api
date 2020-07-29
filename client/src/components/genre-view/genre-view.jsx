import React, {useState} from 'react';
import {Header} from '../header/header';
import axios from 'axios';
import './genre-view.scss';

import { connect } from 'react-redux';
import {movies, visibilityFilter,selectedMovie} from '../../reducers/reducers';
import {setMovies,setFilter,setSelected}from '../../actions/actions';


let Genre = function(props){

    const [description, setDescription] = useState('');
    const [name, setName] = useState('');

    // Similar to componentDidMount and componentDidUpdate:
    
    
    //variables to be filled
    
    //get genre name
    let genre= props.match.params.name;
    
    
    let movies=props.movies;
    let c;

    for(c=0;c<movies.length;c++)
      {
        if(movies[c].genre.name==genre)
          {
            genre=movies[c].genre;
          }
      }


    let genre_name=genre.name;
    let path ='https://stavflix.herokuapp.com/movies/genres/'+ genre_name;
    let token = localStorage.getItem('token');
    
    
    axios.get(path,{headers: { Authorization: `Bearer ${token}`}})
    .then(function(response){
        let data=response.data;
        console.log(data.genre);
        setDescription(data.genre.description);
        setName(data.genre.name);
        

        
    })
    .catch(function(response){
        console.log(response);
    })

    return(

        <div className='container genre_main' >
            <div className='container genre_container'>
                <div className='row genre_row genre_name'>
                    <div className='col col-12 genre_col'><h1>{name}</h1></div>
                    </div>
                    <p className='col-12 genre_p'>{description}</p>

                <div className='row genre_row'>
                    <div className='col col-12 genre_col'>
                        <h5>Movies of the same genre</h5>
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
    let id=localStorage.getItem('selected');
    
    let path ='https://stavflix.herokuapp.com/client/movies/'+id;
    window.location.replace(path);
}



function findMovies(){
    let c;
    let movies=props.movies;

    let titles=[];
    let movs=[]; //movies to return

    for(c=0;c<movies.length;c++)
        {
            
            if (movies[c].genre.name==genre_name)
                {
                    titles.push(movies[c]);
                    
                }
        }    

        


        for(c=0;c<titles.length;c++)
        {
            let n =c;
            movs[c]=<div className='col-12 director_col link button' onClick={()=>{redirect(titles[n]._id)}} >{titles[c].title}</div>
            
        }    

        return <div className='col-12 director_col'>{movs}</div> ;

}

function redirect(path){
        
    //set new selected movie in localStorage
    localStorage.setItem('selected',path);

    //redirect to the new selected movie
    
     path ='https://stavflix.herokuapp.com/client/movies/'+path;
     window.location.replace(path);
}


}


const mapStateToProps = function(state) {
    return { movies: state.movies,
             visibilityFilter:state.visibilityFilter,
             selectedMovie:state.selectedMovie,
             selectedGenre:state.selectedGenre 
            }
  }
  
  
  export default connect(mapStateToProps)(Genre);    