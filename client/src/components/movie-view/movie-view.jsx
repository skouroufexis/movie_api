import React from 'react';
import axios from 'axios';
import './movie-view.scss';

import {Container, Row, Col} from 'react-bootstrap';


import poster1 from '../../../../public/images/5ea9f0f2d5fcc5119a040af1.jpg';
import poster2 from '../../../../public/images/5ea9f19cd5fcc5119a040af2.jpg';
import poster3 from '../../../../public/images/5ea9f19cd5fcc5119a040af3.jpg';
import poster4 from '../../../../public/images/5ea9f19cd5fcc5119a040af4.jpg';
import poster5 from '../../../../public/images/5ea9f19cd5fcc5119a040af5.jpg';
import poster6 from '../../../../public/images/5ea9f19cd5fcc5119a040af6.jpg';
import poster7 from '../../../../public/images/5ea9f19cd5fcc5119a040af7.jpg';
import poster8 from '../../../../public/images/5ea9f19cd5fcc5119a040af8.jpg';
import poster9 from '../../../../public/images/5ea9f19cd5fcc5119a040af9.jpeg';
import poster10 from '../../../../public/images/5ea9f19cd5fcc5119a040afa.jpg';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

var posters=[poster1,poster2,poster3,poster4,poster5,poster6,poster7,poster8,poster9,poster10];



class MovieView extends React.Component{
  constructor(){

    super();

    this.state ={favourite:null}
    
  }
  
  
  render(){

    
    let movie=localStorage.getItem('selected');
    movie=JSON.parse(movie);
    let id=movie._id;

    
    

      function findPoster(poster){
        return poster.includes(id);
      }
  
    var poster= posters.find(findPoster);
   
    
      

    return(
      <div id='wrapper'>
        

        
        <Container className='movieViewContainer'>

          

          <Row id='movie_row'>
              <Col md="6" id='test'>
                <img src={poster}></img>

                <Row>
                  <Col md='12'>

                    {this.state.favourite}
                     
                  
                 </Col>
                 
                        
              </Row>

              </Col>
              

              <Col md='6' sm='12'>
                <Row id='other_info_row'>
                  <div id='movie_description_container'>
                  <Col md='12'><h1 className='movie_view_h1'>{movie.title}</h1></Col>
                  <Col md='12'><p className='synopsis'>{movie.description}</p></Col>
                  </div>
                  {/* other info */}
                  <div id='other_info_container'>
                  <Col md='12' className='otherInfo'><b><h6>Director</h6></b></Col>
                  <Col md='12' className='otherInfo'>
                    <p className='button' id='director' onClick={()=>this.redir(1)}>{movie.director.name}</p>
                  </Col>
                                                            
                  <Col md='12' className='otherInfo'><b><h6>Genre</h6></b></Col>
                  <Col md='12' className='otherInfo'><p className='button' id='genre' onClick={()=>this.redir(2)}>{movie.genre.name}</p></Col>

                  <Col md='12' className='otherInfo'><b><h6>Featured</h6></b></Col>
                  <Col md='12' className='otherInfo'><p>{String(movie.featured)}</p></Col>
                  </div>
                </Row>
                    
              </Col>
        </Row>
         </Container>

         <Container>
            <Row  id="back_row">
              <Col md="6">
              
              </Col>
              <Col md="6">
              <button className='col-12' onClick={this.goback}>Back</button>
              </Col>
            </Row>
         </Container>

      </div>

    )

  }


  componentDidMount(){
    let self= this;
     //icons to show depending on whether the movie is included or not 
     //in user's favourites
     let isFavourite=( 
      <div className='col-12'>
        <button className='col-12' id='button_favourites_on' onClick={()=>this.handleFavourites(2)}>
          <i class="fas fa-heart favourites_icon"></i>
        </button>
        <p className='col-12 p_favourites'>Remove from favourites</p>
      </div>
    )
    let isNotFavourite=( 
          <div className='col-12'>
            <button className='col-12' id='button_favourites_off' onClick={()=>this.handleFavourites(1)}>
              <i class="far fa-heart favourites_icon"></i>
            </button>
            <p className='col-12 p_favourites'>Add to favourites</p>
          </div>
        )

    //get user id
    let user =localStorage.getItem('user');
    user=JSON.parse(user);
    let user_id=user._id;
    let token = localStorage.getItem('token');
    let path ='https://stavflix.herokuapp.com/users/'+user_id;   

    //get movie id
    let movie=localStorage.getItem('selected');
    movie=JSON.parse(movie);
    let movie_id=movie._id;
    
    //retrieve user info from database & control whether movie id is 
    //included in user's favourites
    axios.get(path,{headers: { Authorization: `Bearer ${token}`}}
         )
        .then(function(response){

          let userFavourites=response.data[0].favourites;
          let fav=userFavourites.includes(movie_id);
          console.log(fav);

          if(fav==false)
            {
              self.setState({favourite:isNotFavourite});
            }
          else
            {
              self.setState({favourite:isFavourite});
            }  

        })
        .catch(function (error) {
         console.log(error);  
         });
  }


  //add or remove movie from favourites
  handleFavourites(n){
    let self=this;


    let isFavourite=( 
      <div className='col-12'>
        <button className='col-12' id='button_favourites_on' onClick={()=>this.handleFavourites(2)}>
          <i class="fas fa-heart favourites_icon"></i>
        </button>
        <p className='col-12 p_favourites'>Remove from favourites</p>
      </div>
    )
    let isNotFavourite=( 
          <div className='col-12'>
            <button className='col-12' id='button_favourites_off' onClick={()=>this.handleFavourites(1)}>
              <i class="far fa-heart favourites_icon"></i>
            </button>
            <p className='col-12 p_favourites'>Add to favourites</p>
          </div>
        )

    //get user id
    let user =localStorage.getItem('user');
    user=JSON.parse(user);
    let user_id=user._id;
    let token = localStorage.getItem('token');
    
    //get movie id
    let movie=localStorage.getItem('selected');
    movie=JSON.parse(movie);
    let movie_id=movie._id;


    let path='https://stavflix.herokuapp.com/users/'+user_id+'/favourites/'+movie_id;
    
    if(n==1)//add movie to favourites
      {
        axios.post(path,{},{headers: {Authorization: `Bearer ${token}`}})
        .then(function(response){
          
          console.log(response);
          self.setState({favourite:isFavourite});
        }
        )
        .catch(function(response){
          alert(response);
          console.log(response);
        });
      }
     else //remove movie from favourites
     {
        axios.put(path,{},{headers: {Authorization: `Bearer ${token}`}})
        .then(function(response){
          console.log(response);
          self.setState({favourite:isNotFavourite});
        }
        )
        .catch(function(response){
          alert(response);
          console.log(response);
        });
     } 

  }

  //redirect to 'director' or 'genre' view
  redir(n){


    //get movie id
    let movie=localStorage.getItem('selected');
    movie=JSON.parse(movie);
    let movie_id=movie._id;
    let director = movie.director.name;
    let genre = movie.genre.name;
    

    let path;

    if(n=='1')//go to 'director' view
      {
        path = 'http://localhost:1234/movies/directors/'+director;
        window.location.replace(path);
      }

    else //go to genre view
      {
        path = 'http://localhost:1234/movies/genres/'+genre;
        window.location.replace(path);
      }

  }

  goback(){
    window.location.replace('http://localhost:1234/');
  }

}

export {MovieView}