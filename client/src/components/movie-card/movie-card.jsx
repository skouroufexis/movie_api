import React from 'react';
import './movie-card.scss';


import {Container, Row, Col} from 'react-bootstrap';
import {MovieView} from '../movie-view/movie-view';

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
import { selectFields } from 'express-validator/src/select-fields';

var posters=[poster1,poster2,poster3,poster4,poster5,poster6,poster7,poster8,poster9,poster10];






class MovieCard extends React.Component{

  constructor(){
    super();
    
  }

  render (){
      
      let movie=this.props.movie;
      let selected=this.props.selected;
      

      let id = this.props.id;
      function findPoster(poster){
        return poster.includes(id);
      }
  
      let poster= posters.find(findPoster);

        return (

          <Col lg='4' md='6' sm='12' className='card'>
            
            {<img className='previewImg' src={poster} />}<br></br>
            <h5>{this.props.title}</h5><br></br>
            <button className="button_card" onClick={()=>selected(movie)} >open</button>
          </Col>
        );
  }

  

}

export {MovieCard};