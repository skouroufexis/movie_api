
import React from 'react';
import './visibility-filter-input.scss'


// REDUX
import { connect } from 'react-redux';
import {setMovies,setFilter,setSelected,setUser}from '../../actions/actions';
import {movies, visibilityFilter,selectedMovie,selectedUser} from '../../reducers/reducers';


/**
 * @function Visibility
 * @param {object} props 
 * @returns textbox for typing movie title (movies to be filtered by title) <br>
 * filters movies by title
 */
let Visibility=function(props){

    return (
        <div className='row filter_container'>
        <div className='col'>
          <input className='col-10' id='input_filter' type='text' placeholder= 'search movie title here' onKeyUp={()=>{filterMovies()}}></input>
        </div>
        </div>
    )


    /**
     * filters movies by user generated search string
     * @function filterMovies() {
       
     }
     */  
    function filterMovies(){
        
        let filterText=document.getElementById('input_filter').value;
        props.filter(filterText);
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
  
   export default connect(mapStateToProps,mapDispatchToProps)(Visibility); 
