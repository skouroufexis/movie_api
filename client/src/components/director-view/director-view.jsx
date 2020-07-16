import React from 'react';
import {Header} from '../header/header';
import './director-view.scss';

let Director = function(props){

     //get movie id
     let movie=localStorage.getItem('selected');
     movie=JSON.parse(movie);

     let name=movie.director.name;
     let birth=movie.director.birth;
         birth=birth.split('-');
            let year=birth[0];
            let month = birth[1];
            let day = birth[2].split('T');
                 day=day[0];
        birth=day+'-'+month+'-'+year;
        
        let bio=movie.director.bio;    
     



    return(
        <div className='container director_main' >
            <div className='container director_container'>
                <div className='row director_row director_name'>
                    <div className='col col-12 director_col'><h1>{name}</h1></div>
                </div>

                <div className='row director_row'>
                    <div className='col col-12 director_col'>
                        <h5>Biography</h5>
                            <p>{bio}</p>
                    </div>
                </div>


                <div className='row director_row'>
                    <div className='col col-12 director_col'>
                        <h5>Date of birth</h5>
                            <p>{birth}</p>
                    </div>
                </div>

                <div className='row director_row'>
                    <div className='col col-12 director_col'>
                        <h5>Movies</h5>
                    </div>
                </div>

                <div className='row director_row'>
                    {findMovies()}
                </div>

                <div className='row director_row'>
                    
                <div className='col-5'></div>
                    <button className='col-5 director_back' onClick={()=>back()}>Back</button> 
                    
                    
                </div>


            </div>
        </div>
    )


    function findMovies(){
       
        let c;
        let m=props.movies;
        let l =m.length;
        let titles=[];
        let movs=[]; //movies to return
        

        for(c=0;c<l;c++)
            {
                
                if (m[c].director.name==name)
                    {
                        titles.push(m[c]);
                        
                    }
            }    

            l=titles.length;


            for(c=0;c<l;c++)
            {
                let n =c;
                movs[c]=<div className='col-12 director_col link button' onClick={()=>{redirect(n,titles[n])}} >{titles[c].title}</div>
                console.log(titles[c].title);
            }    

            return <div className='col-12 director_col'>{movs}</div> ;

    }

    function back(){
        //get movie id
        let movie=localStorage.getItem('selected');
        movie=JSON.parse(movie);
        let movie_id=movie._id;
        let path ='http://localhost:1234/movies/'+movie_id;
        window.location.replace(path);
    }


    function redirect(path,newSelectedMovie){
        
        //set new selected movie in localStorage
        localStorage.setItem('selected',JSON.stringify (newSelectedMovie));

        //redirect to the new selected movie
        
         path ='http://localhost:1234/movies/'+path;
         window.location.replace(path);
    }

}


export{Director};