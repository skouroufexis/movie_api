import React,{Component, useState} from 'react';
import axios from 'axios';
import {Header} from '../header/header';

import {Container, Row, Col,Form} from 'react-bootstrap';

// REDUX
import { connect } from 'react-redux';
import {setUser}from '../../actions/actions';
import {selectedUser} from '../../reducers/reducers';

import './login-view.scss';

/** 
 * <b>endpoint:</b> / (when user is not logged in)
 * @function LoginView
 * @param {object} props 
 * @returns {Component} LoginView
 */

function LoginView(props) {
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

            //main view will take this and add user to Store
            
            localStorage.setItem('user', JSON.stringify(data.user));
        
            window.location.replace("https://stavflix.herokuapp.com/client/ ");
            
            })
           .catch(e => {
            console.log(e);
            alert('invalid credentials');
           });        
    }

    /**
     * captures user's credentials
     * @function captureCredentials
     */
    function captureCredentials(){
        var usernameInput=document.getElementById('login_username').value;
        var passwordInput=document.getElementById('login_password').value;
        
        setUsername(usernameInput);
        setPassword(passwordInput);

    }

    /**
     * opens registration view [RegistrationView component]
     * @function openregister
     * @returns {Component} RegistrationView
     */
    function openregister(){
        window.location.replace("https://stavflix.herokuapp.com/client/register ");
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

const mapStateToProps = function(state) {
    return { movies: state.movies,
             visibilityFilter:state.visibilityFilter,
             selectedMovie:state.selectedMovie,
             selectedUser:state.selectedUser
            }
  }
  
  const mapDispatchToProps=function(dispatch){
    
      return {
              loadMovies:(data)=>{dispatch(setMovies(data));},
              filter:(data)=>{dispatch(setFilter(data));},
              setSelected:(data)=>{dispatch(setSelected(data));},
              setUser:(data)=>{dispatch(setUser(data));}
             }
     
   }
  
  
  
    
  
   export default connect(mapStateToProps,mapDispatchToProps)(LoginView);  