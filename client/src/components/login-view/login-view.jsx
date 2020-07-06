import axios from 'axios';

import React,{useState} from 'react';
import {Container, Row, Col,Form} from 'react-bootstrap';

import './login-view.scss';

function LoginView(props) {

    let openregister = props.openregister;   
    let onlogin = props.onlogin;

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    function login(){
        
        // var signin = new XMLHttpRequest();
        
        // var data = JSON.stringify({"username":username,"password":password});
        
        // signin.onreadystatechange = function() {
        // if (this.readyState == 4 && this.status == 200) {
        //       var ans = this.responseText;  

        //      ans=JSON.parse(ans);
        //      document.write(ans.user.username);

        //      }
        //    };

        //    signin.open('POST', `https://stavflix.herokuapp.com/login`,true)
        //    signin.setRequestHeader("Content-type", "application/json");
        //    signin.send(data);



        //sent post request with credentials
        axios.post('https://stavflix.herokuapp.com/login', 
             {username:username,password:password})
           .then(function(response){
                 const data = response.data;
                 
            onlogin(data);//response as paramenter of the 'onlogin' prop which will trigger the 'onlogin' function in MainView  
                }
              )
           .catch(e => {
            console.log('no such user')
           });

        
    }

    function captureCredentials(){
        var usernameInput=document.getElementById('username').value;
        var passwordInput=document.getElementById('password').value;
        
        setUsername(usernameInput);
        setPassword(passwordInput);

    }


    return(
            <Form id='form' >
            <Container id='container'>
                <Row>
                    
                    <Col className='header' md='12'><h1>User Login</h1></Col>

                    <Col md='2' sm='auto'></Col>
                    <Col md='8' sm='12'><p>Username</p></Col>
                    <Col md='2' sm='auto'></Col>

                    <Col md='2' sm='auto'></Col>
                    <Col md='8' sm='12'><input id='username' onChange={captureCredentials} type='text'></input> </Col>
                    <Col md='2' sm='auto'></Col>
                </Row>

                <Row>
                    <Col md='2' sm='auto'></Col>
                    <Col md='8' sm='12'><p>Password</p></Col>
                    <Col md='2' sm='auto'></Col>
                    
                    <Col md='2' sm='auto'></Col>
                    <Col md='8' sm='12'><input id='password' onChange={captureCredentials} type='text'></input> </Col>
                    <Col md='2' sm='auto'></Col>
                </Row>

                <Row>
                    <Col md='2' sm='auto'></Col>
                    <Col md='8' sm='12'><button id='login' type='button' onClick={login} >login</button></Col>
                    <Col md='2' sm='auto'></Col>
                </Row>

                <Row>
                    <Col md='2' sm='auto'></Col>
                    <Col md='8' sm='12'><button id='signup' onClick={function(){
                        openregister();
                    }}  type='button'>signup</button></Col>
                    <Col md='2' sm='auto'></Col>
                </Row>
            </Container>
            </Form>

    )
} 

export {LoginView};