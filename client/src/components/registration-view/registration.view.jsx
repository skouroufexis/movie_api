import React,{useState} from 'react';
import {Container, Row, Col, Form} from 'react-bootstrap';
import axios from 'axios';

import './registration-view.scss';

/**
 *  <b>endpoint:</b> /register
 * @function RegistrationView
 * @param {object} props 
 * @returns screen for user registration
 */
function RegistrationView(props) {

    /**
     * registers new user
     * @function register
     */
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

    /**
     * redirects to the login screen
     * @function openlogin
     */
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
                    <Col md='8' sm='12'><p>Date of Birth (dd-mm-yyyy)</p></Col>
                    <Col md='2' sm='auto'></Col>
                    
                    <Col md='2' sm='auto'></Col>
                    <Col md='8' sm='12'><input type='text' id='birthday' placeholder='dd-mm-yyyy'></input> </Col>
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