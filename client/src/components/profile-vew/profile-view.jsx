import React from 'react';
// import {Header} from '../header/header';
import './profile-view.scss';

var Profile = function(props){
    // const [ username, setUsername ] = useState('');
    // const [ password, setPassword ] = useState('');
    return(
        <div>

        
        {/* <Header /> */}
        <div>
            
            <div className='row main'>

                <div className='col-10 menu_option   button' onClick={()=>{
                    redirect('http://localhost:1234/users/movies');
                }}>
                    <i class="fas fa-film col-12 icon"></i> 
                    <div className='col-12 icon_text '>My movies</div>
                </div>

                <div className='col-10 menu_option button' onClick={()=>{
                    redirect('http://localhost:1234/users/account');
                }} >
                    <i class="fas fa-info col-12 icon"></i> 
                    <div className='col-12 icon_text'>Account information</div>
                </div>
                <div className='col-10 div_button'> <button className='col-8' onClick={()=>{
                    redirect('http://localhost:1234/');
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