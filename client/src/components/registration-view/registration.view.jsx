import React,{useState} from 'react';
import {Container, Row, Col, Form} from 'react-bootstrap';
import axios from 'axios';

import './registration-view.css';

function RegistrationView(props) {
    

    function register(){
        //capture credentials and add new user
        let email=document.getElementById('email').value;
        let username=document.getElementById('username').value;
        let password=document.getElementById('password').value;
        let birthday=document.getElementById('birthday').value;

        axios.post('https://stavflix.herokuapp.com/users',
                   {email:email,username:username,password:password,birthday:birthday}
                   )
              .then(function(response){
                  console.log(response);
                  alert('Account successfully created');
                  window.location.replace('https://stavflix.herokuapp.com/client/')
              })
              .catch(function(response){
                  console.log(response);
              })     
                   
        
        
    }

    function openlogin(){
        window.location.replace("https://stavflix.herokuapp.com/client/ ");
    }


    return(
            <Form>
            <Container id='container'>
                <Row>
                    
                    <Col className='header' md='12'><h1>User Registration</h1></Col>

                    <Col md='2' sm='auto'></Col>
                    <Col md='8' sm='12'><p>Username</p></Col>
                    <Col md='2' sm='auto'></Col>

                    <Col md='2' sm='auto'></Col>
                    <Col md='8' sm='12'><input type='text' id='username'></input> </Col>
                    <Col md='2' sm='auto'></Col>
                </Row>

                <Row>
                    <Col md='2' sm='auto'></Col>
                    <Col md='8' sm='12'><p>Password</p></Col>
                    <Col md='2' sm='auto'></Col>
                    
                    <Col md='2' sm='auto'></Col>
                    <Col md='8' sm='12'><input type='text' id='password'></input> </Col>
                    <Col md='2' sm='auto'></Col>
                </Row>

                <Row>
                    <Col md='2' sm='auto'></Col>
                    <Col md='8' sm='12'><p>Email</p></Col>
                    <Col md='2' sm='auto'></Col>
                    
                    <Col md='2' sm='auto'></Col>
                    <Col md='8' sm='12'><input type='text' id='email'></input> </Col>
                    <Col md='2' sm='auto'></Col>
                </Row>

                <Row>
                    <Col md='2' sm='auto'></Col>
                    <Col md='8' sm='12'><p>Date of Birth</p></Col>
                    <Col md='2' sm='auto'></Col>
                    
                    <Col md='2' sm='auto'></Col>
                    <Col md='8' sm='12'><input type='text' id='birthday'></input> </Col>
                    <Col md='2' sm='auto'></Col>
                </Row>

                <Row>
                    <Col md='2' sm='auto'></Col>
                    <Col md='8' sm='12'><button id='register' type='button' onClick={register} >Register</button></Col>
                    <Col md='2' sm='auto'></Col>
                </Row>

                <Row>
                    
                    <Col id='col_back'><button id='back' type='button' onClick={openlogin}>back</button></Col>
                    
                </Row>

                
            </Container>
            </Form>

    )
} 

export {RegistrationView};