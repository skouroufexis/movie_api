import React from 'react';
import {Header} from '../header/header';
import './genre-view.scss';
let Genre = function(props){

    return(

        <div>
              {/* {Header()}   */}
            
            <div className='row genre_row header'>
                <div className='col col-12 genre_col'><h1>Genre Name</h1></div>
            </div>

            <div className='row genre_row header'>
                <div className='col col-12'> 
                    <p>Genre description</p>
                </div>
            </div>

            <div className='row genre_row header'>
                <div className='col col-12 genre_col'>
                    <h5>Movies listed as GenreName</h5>
                </div>
            </div>

            <div className='row genre_row header'>
                <div className='col col-6 genre_col'>
                    <img></img>
                </div>
                <div className='col col-6 genre_col title'>
                    <h6>Movie Title</h6>
                </div>
            </div>

            <div className='row genre_row'>
                <div className='col-10 md-col-4'>
                <button className='col-md-4  col-10 ' onClick={()=>back()}>Back</button> 
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


export{Genre};