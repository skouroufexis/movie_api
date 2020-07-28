import React from 'react';
import './header.scss';

// REDUX
import { connect } from 'react-redux';

import {selectedUser} from '../../reducers/reducers';

let username;
var Header = function(props){
    let user;
    if(props.selectedUser!="")
    {
        user=props.selectedUser;
        username = user.username;
        username=username.charAt(0);
        username=username.toUpperCase();   
        
    }
    
        
    
    
    
    


    return(
        <div className='container'>

            <div className='row'>

                <div className='col col-10 button' onClick={mainMenu}>
                    <h3>Myflix</h3>
                </div>

                <div className='col col-1'>
    <i className="fas fa-user button" onClick={toggleMenu}></i>{' '+username}
                </div>

            </div>
            
            <div className='row' id='menu'>
                <div className='col col-11 menu_item button' onClick={openProfile}>My account</div>
                <div className='col col-11 menu_item button' onClick={mainMenu}  >Main</div>
                <div className='col col-11 menu_item button' onClick={logout}>logout
                </div>
                
            </div>

        </div>
    
    )

    function mainMenu(){
        window.location.replace("http://localhost:1234/");
    }    

    function openProfile(){
        window.location.replace("http://localhost:1234/users/profile");
    }

    function logout(){
        localStorage.clear();
        window.location.replace("http://localhost:1234/");
    }
    function toggleMenu(){
        var state = document.getElementById('menu');
        if(state.classList.contains('visible'))
            {
                state.classList.remove('visible')
                state.style.opacity=0;
                state.style.transform='translateY(-20px)';
                setTimeout(function(){state.style.display='none';},
                 400);
            }
        else
            {
                
                state.style.display='flex';
                setTimeout(function(){
                    state.style.opacity='1';
                    state.style.transform='translateY(0px)';
                    state.classList.add('visible');
                },
                100);
                

            }

           
    }

}

const mapStateToProps = function(state) {
    return { movies: state.movies,
             visibilityFilter:state.visibilityFilter,
             selectedMovie:state.selectedMovie,
             selectedUser:state.selectedUser
            }
  }

export default connect(mapStateToProps)(Header);  