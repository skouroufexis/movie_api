import React from 'react';
import {Header} from '../header/header';
import './genre-view.scss';
let Genre = function(props){

    return(

        <div>
              {/* {Header()}   */}
            
            <div className='row header'>
                <div className='col col-12'><h1>Genre Name</h1></div>
            </div>

            <div className='row header'>
                <div className='col col-12'> 
                    <p>Genre description</p>
                </div>
            </div>

            <div className='row header'>
                <div className='col col-12'>
                    <h5>Movies listed as GenreName</h5>
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


export{Genre};