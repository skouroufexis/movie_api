import React,{useState} from 'react';
import axios from 'axios';
import {Header} from '../header/header';

import {Container, Row, Col,Form} from 'react-bootstrap';

import './login-view.scss';

function LoginView(props) {

     
    // let onlogin = props.onlogin;

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    function login(){
        
        //sent post request with credentials
        axios.post('https://stavflix.herokuapp.com/login', 
             {username:username,password:password})
           .then(function(response){
                 const data = response.data;
                 console.log('user found');

                //for later use. If user will want to modify his credentials then he
                //will be presented with the unhashed password. 
                localStorage.setItem('password',password);

            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.user.username);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // localStorage.setItem('user', JSON.stringify(data.user));

            window.location.replace("http://localhost:1234/ ");
            
            })
           .catch(e => {
            console.log(e);
            alert('invalid credentials');
           });        
    }

    function captureCredentials(){
        var usernameInput=document.getElementById('login_username').value;
        var passwordInput=document.getElementById('login_password').value;
        
        setUsername(usernameInput);
        setPassword(passwordInput);

    }
    
    function openregister(){
        window.location.replace("http://localhost:1234/register ");
    }

    return(
                
                
                <Form id='login_form' >
                    
                <Container id='login_container'>
                    <Row>
                        
                        <Col className='login_header' md='12'><h1>User Login</h1></Col>

                        <Col md='2' sm='auto'></Col>
                        <Col md='8' sm='12'><p>Username</p></Col>
                        <Col md='2' sm='auto'></Col>

                        <Col md='2' sm='auto'></Col>
                        <Col md='8' sm='12'><input id='login_username' onChange={captureCredentials} type='text'></input> </Col>
                        <Col md='2' sm='auto'></Col>
                    </Row>

                    <Row>
                        <Col md='2' sm='auto'></Col>
                        <Col md='8' sm='12'><p>Password</p></Col>
                        <Col md='2' sm='auto'></Col>
                        
                        <Col md='2' sm='auto'></Col>
                        <Col md='8' sm='12'><input id='login_password' onChange={captureCredentials} type='text'></input> </Col>
                        <Col md='2' sm='auto'></Col>
                    </Row>

                    <Row>
                        <Col md='2' sm='auto'></Col>
                        <Col md='8' sm='12'><button id='login_button' type='button' onClick={login} >login</button></Col>
                        <Col md='2' sm='auto'></Col>
                    </Row>

                    <Row>
                        <Col md='2' sm='auto'></Col>
                        <Col md='8' sm='12'><button id='login_signup_button' type='button' onClick={openregister}>signup</button></Col>
                        <Col md='2' sm='auto'></Col>
                    </Row>
                </Container>
                </Form> 
            

    )
    
} 

export {LoginView};