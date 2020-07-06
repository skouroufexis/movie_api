import React from 'react';
import axios from 'axios';

import './main-view.scss';

import {Container, Row, Col} from 'react-bootstrap';

import {LoginView} from '../login-view/login-view';
import {RegistrationView} from '../registration-view/registration.view';
import {MovieCard, BtnMovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

class MainView extends React.Component{
  constructor(){
    super();
    this.state ={content:null,
                 selected:null,
                 user:null,
                 isLogged:null,
                 openRegister:null};
    
    
  }

  render(){
    
    let islogged=this.state.isLogged;
    let openregister=this.state.openRegister;
    let movies = this.state.content;
    let selected=this.state.selected;
    let back = this.state.back;
    let self=this;
    
    if(islogged==null & openregister==null)
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

      if(openregister==true)
      {
        return(
          <RegistrationView backtologin={function(){
            self.baktoLogin();
          }} />
        );
      }

      else
      {
        if(movies!=null && selected==null) 
        {     
          return(
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
          )
        }
        else if(movies!=null && selected!=null && back==null)
        {
          return (<MovieView
    
                  movie={this.state.selected}
                  
                  back={goBack=>this.goBack()}
                  />);
        }
    
        else
        {
          return('');
        }
      }
  }
  
  componentDidMount(){
    axios.get('https://stavflix.herokuapp.com/movies').then(response=>{
      var data = response.data;
      this.setState({content:data});
      console.log(this.state.back);
    })
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
    // document.write(data.user.username);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', data.user.username);
    
    
    this.getMovies(data.token);
  }

getMovies(token){
  axios.get('https://stavflix.herokuapp.com/movies', {
    // headers: { Authorization: `Bearer ${token}`}
  })
  .then(function(response){
   document.write(response).data;
   this.setState({content:response.data});
   
  })
  .catch(function (error) {
    console.log(error);
  });
}

  //go back to login page
  baktoLogin(){
    this.setState({isLogged:null, openRegister:null})
  }

}

export {MainView};