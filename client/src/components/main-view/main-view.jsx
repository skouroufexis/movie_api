import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route} from "react-router-dom";



import './main-view.scss';

import {Container, Row, Col} from 'react-bootstrap';

import {LoginView} from '../login-view/login-view';
import {RegistrationView} from '../registration-view/registration.view';
import {MovieCard, BtnMovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {Header} from '../header/header';
import {Profile} from '../profile-vew/profile-view';

class MainView extends React.Component{
  constructor(){
    super();
    this.state ={content:null,
                 selected:null,
                 user:null,
                 openRegister:null};
  }

  render(){
    
    let user = this.state.user;
    let openregister=this.state.openRegister;
    let movies = this.state.content;
    let selected=this.state.selected;
    let back = this.state.back;
    let self=this;

    if(user==null) //user not logged in
      {    

          if(openregister==true) //user clicks 'Register' button
            {
              return(
                <RegistrationView backtologin={function(){
                  self.baktoLogin();
                }} />
              );
            }
          else 
            {
              
              return(
                <LoginView      
                  openregister={function(){
                      self.openRegister();
                  }}

                  onlogin={function(data){
                    self.login(data);
                  }}
                />
                );
            }
      }

    else //user is logged in
      { 
          if(movies==null) //movies not yet loaded
          {
            return(<div>loading</div>);
          }
          

          else if(movies!=null && selected==null) //movies loaded but user hasn't selected an individual movie
            {
              console.log(movies);
                return(
                 <div> 
                        {<Header
                          logout={function(){
                            self.logout();
                          }}
                          
                        
                        />}
                        <div className='container'>
                        
                        <div className='row'>
                        
                          {movies.map(movie=>
                            <MovieCard key={movie._id}
                                      title={movie.title}
                                      id={movie._id}  
                                      movie={movie}
                                      selected={movie=>this.selectedMovie(movie)}
                            />
                          )} 
                        </div> 
                        </div>  
                  </div>    
             )
            }
          else //user selected an individual movie
            {
              return (<MovieView
              movie={this.state.selected}
              back={goBack=>this.goBack()}
            />);
            }

      }

  } 
  
  
  componentDidMount(){
    
    let token = localStorage.getItem('token');
    let username=localStorage.getItem('user');
    
    if(token!=null)
      {
        this.setState({user:username});
        this.getMovies(token);
      }
    
    
  }


  selectedMovie(movie){
    this.setState({selected:movie});
  }

  //go back to movies screen
  goBack(){
    this.setState({selected:null});
    
  }

  //open user register screen
  openRegister(){
    
    this.setState({openRegister:true})
  }

 //open movies screen after successful login
  login(data){

    // this.setState({user:data.user}); //user logged in
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', data.user.username);
    
    this.setState({user:data.user.username});
    console.log(data.user.username);
    this.getMovies(data.token);
    
  }

getMovies(token){
  let self = this;
  axios.get('https://stavflix.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then(function(response){
    self.setState({content:response.data});
    

  })
  .catch(function (error) {
    console.log(error);
    
  });
  
}

  //go back to login page
  baktoLogin=()=>{
    this.setState({isLogged:null, openRegister:null})
  }

  

  logout=()=>{
    localStorage.clear();
    this.setState({user:null});
    
  }
  
  
}



export {MainView};