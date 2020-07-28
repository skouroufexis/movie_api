import React from 'react';
import { connect } from 'react-redux';

import {setMovies,setFilter,setSelected}from '../../actions/actions';
import {movies, visibilityFilter,selectedMovie} from '../../reducers/reducers';


import  MovieCard  from '../movie-card/movie-card';


let MoviesList = function(props) {
     const movies = props.movies;
     const visibilityFilter = props.visibilityFilter;     
     

    if(visibilityFilter=="") //no movie selected
    {
       
        let x = movies.map(
            function(movie){
                return (
                          <MovieCard 
                            key={movie._id}
                            title={movie.title}
                            id={movie._id}  
                            movie={movie}
                            
                          />
                      );
              }
          )

      return (
        <div className='container'>
          <div className='row'>
            {x}
          </div>
        </div>
        ) 
    }

    else
    {
        let x = movies.map(
            function(movie){
                let movietitle=movie.title;
                    movietitle=movietitle.trim();
                    movietitle=movietitle.toLowerCase();
                let userInput=visibilityFilter;
                    userInput=userInput.trim();
                    userInput=userInput.toLowerCase();
                if(movietitle.includes(userInput))
                {
                    return (
                        <MovieCard 
                            key={movie._id}
                            title={movie.title}
                            id={movie._id}  
                            movie={movie}
                            

                        />
                    );
                }    
            }
                
          )

      return (
        <div className='container'>
          <div className='row'>
            {x}
          </div>
        </div>
        ) 
    }
  
}



const mapStateToProps = function(state) {
    return { movies: state.movies,
             visibilityFilter:state.visibilityFilter,
             selectedMovie:state.selectedMovie
  
            }
  }


const mapDispatchToProps=function(dispatch){
  
    return {
            loadMovies:(data)=>{dispatch(setMovies(data));},
            filter:(data)=>{dispatch(setFilter(data));},
            setSelected:(data)=>{dispatch(setSelected(data));}
            
           }
   
 }



  

 export default connect(mapStateToProps,mapDispatchToProps)(MoviesList);    

