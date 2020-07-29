import React,{useState, useEffect} from 'react';
import axios from 'axios';
import './movie-view.css';

import {Container, Row, Col} from 'react-bootstrap';

import { connect } from 'react-redux';
import {setMovies,setFilter,setSelected}from '../../actions/actions';
import {movies, visibilityFilter,selectedMovie} from '../../reducers/reducers';



import poster1 from '../../../../public/images/5ea9f0f2d5fcc5119a040af1.jpg';
import poster2 from '../../../../public/images/5ea9f19cd5fcc5119a040af2.jpg';
import poster3 from '../../../../public/images/5ea9f19cd5fcc5119a040af3.jpg';
import poster4 from '../../../../public/images/5ea9f19cd5fcc5119a040af4.jpg';
import poster5 from '../../../../public/images/5ea9f19cd5fcc5119a040af5.jpg';
import poster6 from '../../../../public/images/5ea9f19cd5fcc5119a040af6.jpg';
import poster7 from '../../../../public/images/5ea9f19cd5fcc5119a040af7.jpg';
import poster8 from '../../../../public/images/5ea9f19cd5fcc5119a040af8.jpg';
import poster9 from '../../../../public/images/5ea9f19cd5fcc5119a040af9.jpg';
import poster10 from '../../../../public/images/5ea9f19cd5fcc5119a040afa.jpg';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

var posters=[poster1,poster2,poster3,poster4,poster5,poster6,poster7,poster8,poster9,poster10];

let MovieView = function (props) {


      //icon templates for when movie is in favourites or is not in favourites  
      let favourite=( 
        <div className='col-12'>
          <button className='col-12' id='button_favourites_on' onClick={()=>{handleFavourites(2)}}>
            <i class="fas fa-heart favourites_icon"></i>
          </button>
          <p className='col-12 p_favourites'>Remove from favourites</p>
        </div>
      )



      let notFavourite= ( 
      <div className='col-12'>
        <button className='col-12' id='button_favourites_off' onClick={()=>{handleFavourites(1)}}>
          <i class="far fa-heart favourites_icon"></i>
        </button>
        <p className='col-12 p_favourites'>Add to favourites</p>
      </div>
      );

      // USE STATE & USE EFFECT
      const [isFavourite, setFavourite] = useState(null);

      useEffect(function(){
        
        //query to see if movie is listed in favourites
        let user =props.selectedUser;

        let token = localStorage.getItem('token');
        let path ='https://stavflix.herokuapp.com/users/'+user._id;  

    
        // retrieve user info from database & control whether movie id is 
        // included in user's favourites
        axios.get(path,{headers: { Authorization: `Bearer ${token}`}}
            )
            .then(function(response){
              let userFavourites=response.data[0].favourites;
              let fav=userFavourites.includes(movie_id);
              

              if(fav==false)
                {
                  setFavourite(notFavourite);
                  
                }
              else
                {
                  setFavourite(favourite);
                }  

            })
            .catch(function (error) {
            console.log(error);  
            });
            

      },[isFavourite])

      //retrieve movie from url
      let movie_id= props.match.params.id;
      let movies=props.movies;
      let movie;
      let c;
      let featured;

      for(c=0;c<movies.length;c++)
        {
          if(movies[c]._id==movie_id)
            {
              movie=movies[c];
            }
        }

       if(String(movie.featured)=='true')
        {featured='YES';}
        
        
      function findPoster(poster){
        return poster.includes(movie_id);
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
                    <div id='divFavourite'>
                      {isFavourite}
                    </div>
                    
                     
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
                    <p className='button' id='director' onClick={()=>{redir(movie,1)}} >{movie.director.name}</p>
                  </Col>
                                                            
                  <Col md='12' className='otherInfo'><b><h6>Genre</h6></b></Col>
   <Col md='12' className='otherInfo'><p className='button' id='genre' onClick={()=>{redir(movie,2)}} >{movie.genre.name}</p></Col>

                  <Col md='12' className='otherInfo'><b><h6>Featured</h6></b></Col>
                  <Col md='12' className='otherInfo'><p>{featured}</p></Col>
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
              <button className='col-12' onClick={goback}>Exit</button>
              </Col>
            </Row>
         </Container>

      </div>

    )
    function goback(){
      window.location.replace('https://stavflix.herokuapp.com/client/');
    }  


      //add or remove movie from favourites
  function handleFavourites(n){
    
    //get user id
    let user=props.selectedUser;
    let token = localStorage.getItem('token');
    
    //get movie id
    let movie_id=localStorage.getItem('selected');
    


    let path='https://stavflix.herokuapp.com/users/'+user._id+'/favourites/'+movie_id;
    
    if(n==1)//add movie to favourites
      {
        axios.post(path,{},{headers: {Authorization: `Bearer ${token}`}})
        .then(function(response){
          
          console.log(response);
          setFavourite(favourite);
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
          setFavourite(notFavourite);
        }
        )
        .catch(function(response){
          alert(response);
          console.log(response);
        });
     } 

  }

}

  

  


  

  //redirect to 'director' or 'genre' view
  function redir(movie,n){
    let path;

    if(n=='1')//go to 'director' view
      {
        path = 'https://stavflix.herokuapp.com/client/movies/directors/'+movie.director.name;
        window.location.replace(path);
      }

    else //go to genre view
      {
        path = 'https://stavflix.herokuapp.com/client/movies/genres/'+movie.genre.name;
        window.location.replace(path);
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
          setSelected:(data)=>{dispatch(setSelected(data));}
          
         }
 
}

export default connect(mapStateToProps,mapDispatchToProps)(MovieView);    


 