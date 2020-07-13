import React from 'react';
import axios from 'axios';
import './account_info.scss';

let Account=function(props){

    //make request to database to retrieve user information
    let user_id =localStorage.getItem('user_id');

    axios.get('https://stavflix.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}`}
    })
    .then(function(response){
        console.log(response.data + ' getMovies');
        self.setState({content:response.data});
    
    
    })
    .catch(function (error) {
       console.log(error);
    
  
    });
    

    return(

        <div>
              
            
            <div className='row'>
                <div className='col col-12'><h1>Account Information</h1></div>
            </div>

            <div className='row'>
                    <button className='col-3 button_edit' onClick={enableEdit}><i class="far fa-edit"></i> edit</button>
            </div>

            <div className='row'>
                
                    <form method='post' className='col-10'>

                    <label>Username</label>
                    <input type='text' disabled id='account_username' onFocus={getFocus}
                    onBlur={loseFocus}
                    >

                    </input>

                    <label>Email</label>
                    <input type='text' disabled id='account_email' onFocus={getFocus}
                    onBlur={loseFocus}
                    >

                    </input>

                    <label>Date of Birth</label>
                    <input type='text' disabled id='account_birthday' onFocus={getFocus}
                    onBlur={loseFocus}
                    >
                    </input>

                    <label>Password</label>
                    <input type='text' disabled id='account_birthday' onFocus={getFocus}
                    onBlur={loseFocus}
                    >

                    </input>

                    
                    </form>

            </div>

            <div className='row'>                
                
                <button className='col-3' id='button_cancel' onClick={cancelChanges}>cancel</button>
                <button className='col-3' id='button_update'>save changes</button>
            </div>

            <div className='row'>
                <button className='col-8 button_back' onClick={()=>{
                    redirect('http://localhost:1234/user/profile');
                }}>back</button>
            </div>



            


        </div>
    
    )
    //function to handle redirects            
    function redirect(path){
        window.location.replace(path);
    }    
    
    //function to enable edits on the form
    function enableEdit(){
        //display 'cancel' and 'update' buttons
        document.getElementById('button_update').style.display='block';
        document.getElementById('button_cancel').style.display='block';
        //enable input fields
        let inputs = document.getElementsByTagName('input');
        let x;

        for(x=0;x<inputs.length;x++){
            inputs[x].disabled=false;
        }

        inputs[0].focus();
        inputs[0].style.backgroundColor='whitesmoke';
    }    

    function getFocus(){

        var item= event.target;
        
            if(item.tagName!='BUTTON')
            {
                item.style.backgroundColor='whitesmoke';
            }
    }
    function loseFocus(){
        var item= event.target
        item.style.backgroundColor='white';
    }

    
    function cancelChanges(){
        //make GET request to database and restore previous values

        //disable input fields
        let inputs = document.getElementsByTagName('input');
        let x;
        for(x=0;x<inputs.length;x++){
            inputs[x].disabled=true;
            
        }

        //hide 'cancel' and 'update' buttons
        document.getElementById('button_update').style.display='none';
        document.getElementById('button_cancel').style.display='none';

    }

}


export {Account};