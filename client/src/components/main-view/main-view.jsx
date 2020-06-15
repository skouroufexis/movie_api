import React from 'react';
import axios from 'axios';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';







class MainView extends React.Component{
  constructor(){
    super();
    this.state ={};
    
  }

  render(){
    
    var movies = this.state.content;
    
    
    if(movies)
    {
      
      return(
            <div className='container'>
              {movies.map(movie=>
                 <div className='row button'> 
                  
                  {movie.title}
                  
                  
                  
                </div>
                
              )} 
            </div>  
      )
      
    }
    else
    {
      return('');
    }
    
    

  }


  

  componentDidMount(){
    axios.get('https://stavflix.herokuapp.com/movies').then(response=>{
      var data = response.data;
      this.setState({content:data});
      
    })
    
    
  }

}





export {MainView};