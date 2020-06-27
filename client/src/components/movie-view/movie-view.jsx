import React from 'react';

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

var posters=[poster1,poster2,poster3,poster4,poster5,poster6,poster7,poster8,poster9,poster10];



class MovieView extends React.Component{
  constructor(){
    super();
    this.state={};
  }

  render(){

    const movie= this.props;
    let goback=this.props.back;
      console.log(goback);
      let id=movie.movie._id;
      function findPoster(poster){
        return poster.includes(id);
      }
  
      var poster= posters.find(findPoster);
   
    
      

    return(
      <div className='wrapper'>

      
        <Container className='movieViewContainer'>



          <Row>
              <Col md="6" className="bigPoster">
                <img src={poster}></img>
              </Col>

              <Col md='6'>
                <Row>
                  <Col md='12'><h1>{movie.movie.title}</h1></Col>
                  <Col md='12'><p className='synopsis'>{movie.movie.description}</p></Col>

                  {/* other info */}
                  <Col md='6' className='otherInfo'><h5>Director</h5></Col>
                  <Col md='6' className='otherInfo'><p>{movie.movie.director.name}</p></Col>

                  <Col md='6' className='otherInfo'><h5>Genre</h5></Col>
                  <Col md='6' className='otherInfo'><p>{movie.movie.genre.name}</p></Col>

                  <Col md='6' className='otherInfo'><h5>Featured</h5></Col>
                  <Col md='6' className='otherInfo'><p>{String(movie.movie.featured)}</p></Col>
                </Row>
                    
              </Col>
              
          </Row>

          <Row>
            <div className='col-12 buttonCol'>
              <button onClick={()=>goback()}>Back</button>
            </div>
          </Row>

         </Container>
        
         
      </div>

      

    
    )

  }



}

export {MovieView}