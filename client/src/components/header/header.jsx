import React from 'react';
import './header.css';

var Header = function(props){

    let logout=props.logout;

    let user=localStorage.getItem('user');
    user = user.charAt(0);
    user = user.toUpperCase();


    return(
        <div className='container'>

            <div className='row'>

                <div className='col col-10'>
                    <h3>Myflix</h3>
                </div>

                <div className='col col-1'>
                    <i class="fas fa-user button" onClick={toggleMenu}></i> {user}
                </div>

            </div>
            
            <div className='row' id='menu'>
                <div className='col col-11 menu_item button'>My account</div>
                <div className='col col-11 menu_item button'>Main</div>
                <div className='col col-11 menu_item button' onClick={logout}>logout
                </div>
                
            </div>

        </div>
    
    )


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


export {Header};