import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Header} from '../header/header';


import './main-view.scss';

import {Container, Row, Col} from 'react-bootstrap';

import {LoginView} from '../login-view/login-view';
import {RegistrationView} from '../registration-view/registration.view';
import {MovieCard, BtnMovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {Director} from '../director-view/director-view';
import {Genre} from '../genre-view/genre-view';

import {Profile} from '../profile-vew/profile-view';
import {Account} from '../profile-vew/account_info';
import {Mymovies} from '../profile-vew/mymovies';
import {Notfound} from '../errors/notfound';




class MainView extends React.Component{
  
  constructor(){
    super();
    this.state ={content:null,
                 selected:null,
                 user:null,
                 openRegister:null
                }
  }

    

  render(){
    let token = localStorage.getItem('token');
    let user=localStorage.getItem('username');
    let movies = this.state.content;
    
    let self=this;

    if(!token) //user not logged in
    {
       return(
          <Router>
            
            <div>
              <Switch>
              <Route exact path='/' component={LoginView} />
              <Route exact path='/register' component={RegistrationView} />
              <Route path='/' component={Notfound} /> 
              </Switch>
            </div>
          </Router>
       ) 
    }

    else //user logged in
      
    
    
    
    {

      if(this.state.content==null)
      {
        this.getMovies(token);
        
        return(
            <div>
            
            <Header />
            
            <Router>
              <div>
              <Route exact path='/' render={function(){
                
                return <div>loading</div>;
              }} />
                
              </div>
            </Router>
            </div>
        )
      }
      else
      {

        return (
          <div>
          
          <Header />
          
          <Router>
            <div>
            <Route exact path='/' render={function(){
              
              let x = movies.map(function(movie){
                return (
                  
                  <MovieCard 
                  key={movie._id}
                  title={movie.title}
                  id={movie._id}  
                  movie={movie}
                  
                />
                );
              })
              return (
                  <div className='container'>
                  <div className='row'>
                  {x}
                  </div>
                  </div>
              ) 
              
            }} />
              <Route exact path='/movies/:id' component={MovieView} />
              <Route exact path='/users/profile' component={Profile} />
              <Route exact path='/users/account' component={Account} />

              <Route exact path='/users/movies'>
                 <Mymovies 

                      key={movies}
                      movies= {movies}

                 />
              </Route>
              <Route exact path='/movies/directors/:name/'>
                  <Director
                    key={movies}
                    movies={movies}

                  />
              </Route>


              {/* <Route exact path='/movies/directors/:name/' render={Director} /> */}
              <Route exact path='/movies/genres/:name/' >
                <Genre 

                  key={movies}
                  movies={movies}

                />
              </Route>
            </div>
          </Router>
          </div>
        )
      }
      
    }

  } 
  
  selectedMovie(movie){
    this.setState({selected:movie});
  }

getMovies(token){

  
  let self = this;
  axios.get('https://stavflix.herokuapp.com/movies', 
  {headers: { Authorization: `Bearer ${token}`}}
  )
  .then(function(response){
    console.log(response.data + ' getMovies');
    self.setState({content:response.data});
    
    
  })
  .catch(function (error) {
    console.log(error);
    
  
  });

  
  
}

mountMovies(movies){
  
}

  //go back to login page
  // baktoLogin=()=>{
  //   this.setState({isLogged:null, openRegister:null})
  // }

  
  loggedIn=(user)=>{
    this.setState({user:user});
  }

  
  logout=()=>{
    localStorage.clear();
    this.setState({user:null});
    
  }

}



export {MainView};