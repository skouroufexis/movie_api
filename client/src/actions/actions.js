export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';


export function setMovies(value) {
  return { type: SET_MOVIES,
           value:value };
}

export function setFilter(value) {
  return { type: SET_FILTER, 
           value:value };
}


export function setSelected(value){
  return {
          type:'SET_SELECTED',
          value:value
        };
}


export function setUser(value){

      return {
               type:'SET_USER',
               value:value

             }


}



