import React from 'react';

import { BrowserRouter as Router, Route} from "react-router-dom";

import './notfound.scss';

let Notfound=function(){
    return(
        <main className='notfoundmain row'>
        <div className='notfoundcontainer container'>
            <div className='notfoundrow row'>
                <div className='col-12'>

                        <h1>404</h1>
                        <h3>Page Not Found</h3>

                </div>
            </div>

            <div className='notfoundrow row'>
                <div className='col-12'>

                        <button className='col-3 error_button' onClick={function(){
                            window.location.replace('http://localhost:1234/')
                        }}>back</button>

                </div>
            </div>    


        </div>
        </main>
    )
}

export {Notfound};