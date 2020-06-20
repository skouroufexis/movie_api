import React from 'react';

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

var posters=[poster1,poster2,poster3,poster4,poster5,poster6,poster7,poster8,poster9,poster10];



class MovieView extends React.Component{
  constructor(){
    super();
    this.state={};
  }

  render(){

    const movie= this.props;
    let goback=this.props.back;

      let id=movie.movie._id;
      function findPoster(poster){
        return poster.includes(id);
      }
  
      var poster= posters.find(findPoster);
   
    
      

    return(
      <div className='wrapper'>

      
        <div className='container movieViewContainer'>



          <div className='row'>
              <div className="col-6 bigPoster">
                <img src={poster}></img>
              </div>

              <div className='col-6'>
                <div className='row'>
                  <div className='col-12'><h1>{movie.movie.title}</h1></div>
                  <div className='col-12'><p className='synopsis'>{movie.movie.description}</p></div>

                  {/* other info */}
                  <div className='col-6 otherInfo'><h5>Director</h5></div>
                  <div className='col-6 otherInfo'><p>{movie.movie.director.name}</p></div>

                  <div className='col-6 otherInfo'><h5>Genre</h5></div>
                  <div className='col-6 otherInfo'><p>{movie.movie.genre.name}</p></div>

                  <div className='col-6 otherInfo'><h5>Featured</h5></div>
                  <div className='col-6 otherInfo'><p>{String(movie.movie.featured)}</p></div>
                </div>
                    
              </div>
              
          </div>

          <div className='row'>
            <div className='col-12 buttonCol'><button onClick={()=>goback()}>Back</button></div></div>
         </div>

      </div>
    )


    

  }



}

export {MovieView}