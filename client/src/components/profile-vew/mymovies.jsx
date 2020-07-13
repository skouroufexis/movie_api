import React from 'react';
import './mymovies.scss';

var Mymovies=function(){
    return(
        <div className='container main'>
            <div className='row'>
                <div className='col-12'><h1>My Movies</h1></div>
            </div>

            <div className='row' id='no_content'>
                <div className='col'>
                    No favourite movies found
                </div>
            </div>

            <div className='row' id='content'>
                <div className='col'>image</div>

                <div className='col'>
                    <div className='row'>
                        <div className='col'>Title</div>
                    </div>

                    <div className='row'>
                        <div className='col'><button className='btn_secondary1'>open</button></div>
                        <div className='col'><button className='btn_secondary2'><i class="fas fa-times"></i></button></div>
                    </div>

                </div>
            </div>


             <div className='row'>
                 <div className='col'>
                     <button onClick={()=>{
                    redirect('http://localhost:1234/user/profile/');
                }}>back</button>
                 </div>
            </div>   


        </div>
    )


    function redirect(path){
      window.location.replace(path);
    }
}

export {Mymovies}