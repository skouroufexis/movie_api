import React from 'react';
import {Header} from '../header/header';
import './director-view.scss';

import { connect } from 'react-redux';

import {movies, visibilityFilter,selectedMovie, moviesApp} from '../../reducers/reducers';


let Director = function(props){

     //get director name
     let director= props.match.params.name;
     console.log(director);
     
     let movies=props.movies;
     let c;

     for(c=0;c<movies.length;c++)
       {
         if(movies[c].director.name==director)
           {
             director=movies[c].director;
           }
       }

     let name=director.name;
     let birth=director.birth;
         birth=birth.split('-');
            let year=birth[0];
            let month = birth[1];
            let day = birth[2].split('T');
                 day=day[0];
        birth=day+'-'+month+'-'+year;
        
        let bio=director.bio;    
     



    return(
        <div className='container director_main' >
            <div className='container director_container'>
                <div className='row director_row director_name'>
                    <div className='col col-12 director_col'><h1>{name}</h1></div>
                </div>

                <div className='row director_row'>
                    <div className='col col-12 director_col'>
                        <h5>Biography</h5>
                            <p>{bio}</p>
                    </div>
                </div>


                <div className='row director_row'>
                    <div className='col col-12 director_col'>
                        <h5>Date of birth</h5>
                            <p>{birth}</p>
                    </div>
                </div>

                <div className='row director_row'>
                    <div className='col col-12 director_col'>
                        <h5>Movies</h5>
                    </div>
                </div>

                <div className='row director_row'>
                    {findMovies()}
                </div>

                <div className='row director_row'>
                    
                <div className='col-5'></div>
                    <button className='col-5 director_back' onClick={()=>back()}>Back</button> 
                    
                    
                </div>


            </div>
        </div>
    )


    function findMovies(){
       
        let c;
        let movies=props.movies;
        let titles=[];
        
        let movs=[]; //movies to return
        

        for(c=0;c<movies.length;c++)
            {
                
                if (movies[c].director.name==name)
                    {
                        titles.push(movies[c]);
                        
                    }
            }    

            


            for(c=0;c<titles.length;c++)
            {
                let n =c;
                movs[c]=<div className='col-12 director_col link button' onClick={()=>{redirect(titles[n]._id)}} >{titles[c].title}</div>
                console.log(titles[c].title);
            }    

            return <div className='col-12 director_col'>{movs}</div> ;

    }

    function back(){
        //get movie id
        let id=localStorage.getItem('selected');
        let path ='http://localhost:1234/movies/'+id;
        window.location.replace(path);
    }


    function redirect(path){
        
        //set new selected movie in localStorage
        localStorage.setItem('selected',path);

        //redirect to the new selected movie
        
         path ='http://localhost:1234/movies/'+path;
         window.location.replace(path);
    }

}

const mapStateToProps = function(state) {
    return { movies: state.movies,
             visibilityFilter:state.visibilityFilter,
             selectedMovie:state.selectedMovie
  
            }
  }

  export default connect(mapStateToProps)(Director);    