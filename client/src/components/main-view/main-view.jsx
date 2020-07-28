import './main-view.scss';
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

// REDUX
import { connect } from 'react-redux';
import {setMovies,setFilter,setSelected,setUser}from '../../actions/actions';
import {movies, visibilityFilter,selectedMovie,selectedUser} from '../../reducers/reducers';

import {Container, Row, Col} from 'react-bootstrap';

import Header from '../header/header';
import LoginView from '../login-view/login-view';
import {RegistrationView} from '../registration-view/registration.view';


import Visibility from '../visibility-filter-input/visibility-filter-input';
import MoviesList from '../movies-list/movies-list';

import MovieView from '../movie-view/movie-view';
import Director from '../director-view/director-view';
import Genre from '../genre-view/genre-view';

import {Profile} from '../profile-vew/profile-view';
import Account from '../profile-vew/account_info';
import Mymovies from '../profile-vew/mymovies';
import {Notfound} from '../errors/notfound';




let MainView = function(props){



  let token = localStorage.getItem('token');
  
  
  if(!token) //user not logged in
    {
       return(
         
          <Router basename="/client">
            
            <div>
              <Switch>
              <Route exact path='/client' component={LoginView} />
              <Route exact path='/client/register' component={RegistrationView} />
              <Route path='/client' component={Notfound} /> 
              </Switch>
            </div>
          </Router>
       ) 
   }


   else //user is logged in
        {
          

          if(props.selectedUser=="")
            {
              let user = localStorage.getItem('user');
              user=JSON.parse(user);
              props.setUser(user);
              
            }

          if(props.movies=="")
          {
          
            getMovies(token);
            return(

              <div>
            
              <Header />
              
              <Router>
                <div>
                <Route exact path='/client' render={function(){
                  
                  return (<div className='container'>
                            <div className='row'> loading</div>
                          </div>
                         )
                }} />
                  
                </div>
              </Router>
              </div>

              )
          }


          else //movies loaded in the Store
          {
            
          
          
            
            return(

              <div>
                 <Header />   

                 <Router basename="/client">
                   <div>
                   <Route exact path='/client' >
                     
                     {/* FILTER BAR */}
                      <Visibility />

                     <MoviesList />
                    </Route>

                    <Route exact path='/client/movies/:id' component={MovieView} />
                    <Route exact path='/client/users/profile' component={Profile} />
                    <Route exact path='/client/users/account' component={Account} />

                    <Route exact path='/client/users/movies' component={Mymovies}/>
                      

                    
                        

                    <Route exact path='/client/movies/directors/:name/' component={Director}/>

                    <Route exact path='/client/movies/genres/:name/' component={Genre}/>
                      
                   
            </div>
          </Router>



              </div>




            )
          }
          
        }


        function getMovies(token){
          
          axios.get('https://stavflix.herokuapp.com/movies', 
          {headers: { Authorization: `Bearer ${token}`}}
          )
          .then((response)=>{props.loadMovies(response.data);})
          .catch(function (error) {
            console.log(error);
            
          
          });
        }
        
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

 export default connect(mapStateToProps,mapDispatchToProps)(MainView);    