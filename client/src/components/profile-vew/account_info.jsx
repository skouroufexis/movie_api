import React,{useEffect} from 'react';
import axios from 'axios';
import './account_info.scss';

import {Date} from '../general/date';
import { json } from 'body-parser';


let Account=function(props){

    let user =localStorage.getItem('user');
    user=JSON.parse(user);
    let id=user._id;
    let token = localStorage.getItem('token');
    let path ='https://stavflix.herokuapp.com/users/'+id;   
    
    
    

    //load user information after the form has been rendered
    useEffect(function(){
        

        axios.get(path,{headers: { Authorization: `Bearer ${token}`}}
         )
        .then(function(response){


        
        let username=response.data[0].username; 
        let email=response.data[0].email;
        let birthday=response.data[0].birthday;     
            birthday=birthday.split('-');
            let year=birthday[0];
            let month = birthday[1];
            let day = birthday[2].split('T');
                day=day[0];
            
                //re-build the date in the format required by the database and save it in localStorage for later use
                let newdate=year+'-'+month+'-'+day;
                localStorage.setItem('newdate',newdate);   

        //populate fields with user data        
        let inputs=document.getElementsByClassName('field');
        inputs[0].value=username
        inputs[1].value=email;
        inputs[2].value=day+'-'+month+'-'+year;

        //upon login, the user-submitted password was saved on localStorage
        //so that it can be accessed and shown here, that is a non hashed version
        // of the user's password 
        inputs[3].value=localStorage.getItem('password');    
        })
        .catch(function (error) {
         console.log(error);  
         });

    })

    
    
    return(
        <div>

            <div id='date'>
                <div id='dateContainer'>
                    
                    <Date
                    modal={()=>{closeDate()}}
                    />    

                </div>
                
            </div>      
            
            <div className='row'>
                <div className='col col-12'><h1>Account Information</h1></div>
            </div>

            <div className='row'>
                    <button className='col-12 col-md-3 button_edit' onClick={enableEdit}><i class="far fa-edit"></i> edit</button>
                    <button className='col-12 col-md-3 button_unregister' onClick={unregister} ><i class="fas fa-user-slash"></i>delete account</button>

            </div>
            {/* <i class="fas fa-user-slash"></i> */}
            <div className='row'>
                
                    <form method='post' className='col-10'>

                    <label>Username</label>
                    <input type='text' disabled id='account_username' className='field'>
                    </input>

                    <label>Email</label>
                    <input type='text' disabled id='account_email' className='field'>

                    </input>

                    <label>Date of Birth</label>
                    <input type='text' disabled id='account_birthday' className='field' onFocus={openDate}>
                        
                    </input>

                    <label>Password</label>
                    <input type='password' disabled id='account_password' className='field' onFocus={password}
                    
                    >

                    </input>

                    
                    </form>

            </div>

            <div className='row'>                
                
                <button className='col-3' id='button_cancel' onClick={cancelChanges}>cancel</button>
                <button className='col-3' id='button_update' onClick={update}>save changes</button>
            </div>

            <div className='row'>
                <button className='col-8 button_back' onClick={()=>{
                    redirect('http://localhost:1234/users/profile');
                }}>back</button>
            </div>
        </div>
        
    
    )

             
    


    //function to handle redirects            
    function redirect(path){
        window.location.replace(path);
    }    
    
    //function to delete user account
    function unregister(){
     var unregister =  confirm('Are you sure you want to delete your account?');
     if (unregister==true)
        {
            
            axios.delete(path,{headers: { Authorization: `Bearer ${token}`}})
            .then(function(response){
                alert(response.data);
                console.log(response);
                localStorage.clear();
                redirect('http://localhost:1234/');
            })
            .catch(function(response){
                alert(response.data);
                console.log(response);
                
            })
            
        }
      else
        {
            console.log('account not deleted');
        }  
    }


    //function to enable edits on the form
    function enableEdit(){
        //display 'cancel' and 'update' buttons
        document.getElementById('button_update').style.display='block';
        document.getElementById('button_cancel').style.display='block';
        //enable input fields
        let inputs = document.getElementsByClassName('field');
        let x;

        for(x=0;x<inputs.length;x++){
            inputs[x].disabled=false;
        }

        inputs[0].focus();
        // inputs[0].style.backgroundColor='rgba(32, 178, 170,0.3)';
    }  

    function password(){
    var newPassword= window.prompt('please type a new password');
    var passwordField=document.getElementById('account_password');
    passwordField.blur();
    if(newPassword!=null)
        {
            passwordField.value=newPassword;
        }
    
    }

    //function to open the date modal
    function openDate(){
        var item=document.getElementById('date');
        item.style.display='block'
        setTimeout(() => {
            item.style.opacity='1';
            item.style.transform='translateY(0px)';
        }, 200);
    }

    //function to close the date modal
    function closeDate(){

        var item=document.getElementById('date');

        //close modal
        item.style.opacity='0';
        item.style.transform='translateY(-10px)';
        setTimeout(() => {
            item.style.display='none'
            
        }, 100);

        //update the birthday field if new date was selected
        let newday=localStorage.getItem('newday');
        let newmonth=localStorage.getItem('newmonth');
        let newyear=localStorage.getItem('newyear');

        if(newday!=null && newmonth!=null && newyear!=null)
            {
                document.getElementById('account_birthday').value=newday+'-'+newmonth+'-'+newyear;
                //re-build the selected date in the format required by the database
                //and replace the previous value in localStorage
                let newdate=newyear+'-'+newmonth+'-'+newday;
                localStorage.setItem('newdate',newdate);
        
                localStorage.removeItem('newday');
                localStorage.removeItem('newmonth');
                localStorage.removeItem('newyear');
            }
        

        

        

    }

    //function to restore the previous input element's value
    function cancelChanges(){
        //restore previous values
        let inputs = document.getElementsByClassName('field');
        inputs[0].value=user.username;
        inputs[1].value=user.email;
        inputs[2].value=day+'-'+month+'-'+year;
        inputs[3].value=user.password[0]+user.password[1]+user.password[2];
        //disable input fields

        let x;
        for(x=0;x<inputs.length;x++){
            inputs[x].disabled=true;
            
        }

        //hide 'cancel' and 'update' buttons
        document.getElementById('button_update').style.display='none';
        document.getElementById('button_cancel').style.display='none';

    }


    function update(){
        //get new field values & token
        let username=document.getElementById('account_username').value;
        let user = localStorage.getItem('user');
            user=JSON.parse(user);
            let id=user._id;
        let email=document.getElementById('account_email').value;
        let birthday=localStorage.getItem('newdate');
        let password=document.getElementById('account_password').value;
            localStorage.setItem('password',password);
        let token = localStorage.getItem('token');
        let path ='https://stavflix.herokuapp.com/users/'+id;
        

        axios.put(path,{id:id,username:username,password:password,email:email,birthday:birthday},
                {headers: { Authorization: `Bearer ${token}`}}
        )
        .then(function(response){
        console.log(response.data);
        alert(response.data);

        //refresh page so that updated data will be shown
        window.location.replace('http://localhost:1234/users/account');
        })
        .catch(function (error) {
        console.log(error);  
        });
    }


}


export {Account};