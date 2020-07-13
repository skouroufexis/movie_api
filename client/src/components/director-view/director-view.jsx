import React,{useState} from 'react';
import {Header} from '../header/header';
import './director-view.scss';

let Director = function(props){

    return(

        <div>
              {/* {Header()}   */}
            
            <div className='row'>
                <div className='col col-12 director_col'><h1>Director Name</h1></div>
            </div>

            <div className='row header'>
                <div className='col col-12 director_col'>
                    <h5>Biography</h5>
                    <p>Biography details</p>
                </div>
            </div>

            <div className='row director_row'>
                <div className='col col-12 director_col'>
                    <h5>Movies</h5>
                </div>
            </div>

            <div className='row director_row header'>
                <div className='col col-6 director_col'>
                    <img></img>
                </div>
                <div className='col col-6 director_col director_title'>
                    <h6>Movie Title</h6>
                </div>
            </div>

            <div className='row director_row'>
                <div className='col-10 md-col-4'>
                <button className='col-md-4  col-10 director_button'>Back</button> 
                </div>
                
            </div>


        </div>

    )


}


export{Director};