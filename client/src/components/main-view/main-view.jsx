import React from 'react';
import axios from 'axios';
import {MovieCard, BtnMovieCard} from '../movie-card/movie-card';

import {MovieView} from '../movie-view/movie-view';

class MainView extends React.Component{
  constructor(){
    super();
    this.state ={content:null,selected:null};
  }

  render(){
    
    var movies = this.state.content;
    var selected=this.state.selected;
    var back = this.state.back;

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
  componentDidMount(){
    axios.get('https://stavflix.herokuapp.com/movies').then(response=>{
      var data = response.data;
      this.setState({content:data});
    })
  }

  selectedMovie(movie){
    this.setState({selected:movie, back:null});
  }

  goBack(){
    this.setState({selected:null});
    
  }

  

  

}

export {MainView};