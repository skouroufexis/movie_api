import React,{useState, useEffect} from 'react';
import './mymovies.scss';
import axios from 'axios';

//import movie posters
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
var posters=[poster1,poster2,poster3,poster4,poster5,poster6,poster7,poster8,poster9,poster10];

var Mymovies=function(props){


    let[myFavourites,handleFavourites]=useState(null);
    let[favouritesChange,changeFavourites]=useState(null);

    let user =localStorage.getItem('user');
    user=JSON.parse(user);
    let user_id=user._id;
    let token = localStorage.getItem('token');

    useEffect(function(){
        
        
        let path ='https://stavflix.herokuapp.com/users/'+user_id;   
        
        axios.get(path,{headers: { Authorization: `Bearer ${token}`}}
        )
       .then(function(response){
           
       let favourites =response.data[0].favourites; 
       
       if(favourites!=null)
      
        {
            handleFavourites(favourites);
        }
        
      
       
       
       })
       .catch(function (error) {
        console.log(error);  
        });
    },[favouritesChange]);

    return(
        <div className='container main'>
            <div className='row'>
                <div className='col-12 mymovies_header'><h1>My Movies</h1></div>
            </div>

            

            <div className='mymovies_content_container'>
            {fetchFavourites()}
            </div>
            


             <div className='row'>
                 <div className='col'>
                     <button id='mymovies_back' onClick={()=>{
                    redirect('http://localhost:1234/users/profile/');
                }}>back</button>
                 </div>
            </div>   


        </div>
    )


    function fetchFavourites(){

        if(myFavourites==null)
        {
            return(myFavourites);
        }
        else
        {

       
        let movies = props.movies;
        let l =movies.length;
        let c;
        let c2;
        
        let titles=[]; //array to hold movie titles
        let favs=[]; //array to be returned as rendered elements with movie titles
        let favsPosters=[]; //array to hold the movie favourites' posters
        
        for(c=0;c<l;c++)
            {
                if(myFavourites.includes(movies[c]._id)) //movie id matches favourite movies id
                    {
                        titles.push(movies[c]); //take matching movies
                    }
            }


        for(c=0;c<myFavourites.length;c++)
        {
            for(c2=0;c2<(posters.length);c2++)
                {
                    if(posters[c2].includes(myFavourites[c]))
                        {
                            favsPosters.push(posters[c2]);
                        }
                }
        }
        
        for(c=0;c<titles.length;c++)
            {
            let n =c;
            favs[c]=(<div className='mymovies_main'>
                        <div className='row' id='mymovies_content'>
                                <div className='col-8 link button'>
                                    <div className='row'>
                                        <div className='col-12 col-md-4'>
                                            <img className='mymovies_img' src={favsPosters[c]}></img>
                                        </div>
                                        
                                        <div className='col-12 col-md-8 mymovies_title button' onClick={()=>{redirect(titles[n],titles[n]._id)}}>
                                            {titles[c].title}
                                        </div>
                                    </div>
                                </div>
                                <div className='col-2  button' onClick={()=>{removeFavourite(titles[n]._id)}}><i class="fas fa-times"></i></div>
                        </div>
                    </div>
                    )
        }    
             return <div className='col-12 director_col'>{favs}</div> ;
        }
        
    }

    // redirect to selected movie
    function redirect(movie,id){
     
    localStorage.setItem('selected',JSON.stringify (movie));        
    let path ='http://localhost:1234/movies/'+id;  
    window.location.replace(path);
    }

    //remove movie from favourites
    function removeFavourite(movie_id){

    let path ='https://stavflix.herokuapp.com/users/'+user_id+'/favourites/'+movie_id;   

    axios.put(path,{},
        {headers: { Authorization: `Bearer ${token}`}}
    )
    .then(function(response){
        
    console.log(response.data);
    
    changeFavourites(movie_id);//change the useState variable that will trigger
                              //the useEffect
    })
    .catch(function (error) {
    console.log(error);  
    });
            
    }
    
}

export {Mymovies}