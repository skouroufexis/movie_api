import React from 'react';
import {Header} from '../header/header';
import './director-view.scss';

let Director = function(props){

     //get movie id
     let movie=localStorage.getItem('selected');
     movie=JSON.parse(movie);

     let name=movie.director.name;
     let birthdate=movie.director.birth;
     let bio=movie.director.bio;    
     console.log(movie);



    return(

        <div>
            
            
            <div className='row'>
                <div className='col col-12 director_col'><h1>{name}</h1></div>
            </div>

            <div className='row header'>
                <div className='col col-12 director_col'>
                    <h5>Biography</h5>
                        <p>{bio}</p>
                </div>
            </div>

            <div className='row director_row'>
                <div className='col col-12 director_col'>
                    <h5>Movies</h5>
                </div>
            </div>

            <div className='row director_row header'>
                <div className='col col-6 director_col'>
                    <img className='director_img'></img>
                </div>
                <div className='col col-6 director_col director_title'>
                    <h6>Movie Title</h6>
                </div>
            </div>

            <div className='row director_row'>
                <div className='col-10 md-col-4'>
                <button className='col-md-4  col-10 director_button' onClick={()=>back()}>Back</button> 
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


}


export{Director};