import {combineReducers} from 'redux';

import { SET_FILTER, SET_MOVIES } from '../actions/actions';


    function visibilityFilter(state = '', action) {
        switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
        }
    }


    function movies(state = [], action) {
        switch (action.type) {
        case SET_MOVIES:
            return action.value;
        default:
            return state;
        }
    }


    function selectedMovie (state='',action){
        if(action.type==='SET_SELECTED')
            {
                return action.value;
            }
        else
            {
                return state;
            }
    }


    function selectedUser(state='',action){

        if(action.type==='SET_USER')
            {
                return action.value;
            }
        else
            {
                return state;
            }

    }


    
    

    const moviesApp = combineReducers({
        visibilityFilter,movies,selectedMovie,selectedUser
    });
    
  export  {moviesApp};