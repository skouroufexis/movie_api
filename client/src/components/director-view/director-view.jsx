import React,{useState} from 'react';
import {Header} from '../header/header';
import './director-view.scss';

let Director = function(props){

    return(

        <div>
              {/* {Header()}   */}
            
            <div className='row header'>
                <div className='col col-12'><h1>Director Name</h1></div>
            </div>

            <div className='row header'>
                <div className='col col-12'>
                    <h5>Biography</h5>
                    <p>Biography details</p>
                </div>
            </div>

            <div className='row header'>
                <div className='col col-12'>
                    <h5>Movies</h5>
                </div>
            </div>

            <div className='row header'>
                <div className='col col-6'>
                    <img></img>
                </div>
                <div className='col col-6 title'>
                    <h6>Movie Title</h6>
                </div>
            </div>

            <div className='row'>
                <div className='col-10 md-col-4'>
                <button className='col-md-4  col-10 '>Back</button> 
                </div>
                
            </div>


        </div>

    )


}


export{Director};