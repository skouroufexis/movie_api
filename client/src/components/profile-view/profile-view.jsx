import React from 'react';
// import {Header} from '../header/header';
import './profile-view.scss';



/**
 * <b>endpoint:</b> /users/profile
 * @param {object} props 
 * @returns the screen with further navigation options for the user (personal information or favourite movies)
 */
var Profile = function(props){

    return(
        <div>

        
        {/* <Header /> */}
        <div>
            
            <div className='row main'>

                <div className='col-10 menu_option   button' onClick={()=>{
                    redirect('https://stavflix.herokuapp.com/client/users/movies');
                }}>
                    <i class="fas fa-film col-12 icon"></i> 
                    <div className='col-12 icon_text '>My movies</div>
                </div>

                <div className='col-10 menu_option button' onClick={()=>{
                    redirect('https://stavflix.herokuapp.com/client/users/account');
                }} >
                    <i class="fas fa-info col-12 icon"></i> 
                    <div className='col-12 icon_text'>Account information</div>
                </div>
                <div className='col-10 div_button'> <button className='col-8' onClick={()=>{
                    redirect('https://stavflix.herokuapp.com/client/');
                }}>Exit</button></div>
            </div>
        </div>
        </div>
    )
   function redirect(path){
        window.location.replace(path);
    }    
}

export {Profile};