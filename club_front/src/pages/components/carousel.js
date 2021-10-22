import React, { Component } from 'react';

import { Carousel } from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'materialize-css/dist/css/materialize.min.css';

import img1 from '../../img/carousel/img-1.jpg';
import img2 from '../../img/carousel/img-2.jpg';
import img3 from '../../img/carousel/img-3.jpg';

class partsCarousel extends Component {
    render () {
        return (
            <Carousel>
                <div id="carouselItems">
                <div className="item"><img src={img1}></img></div>
                <div className="item"><img src={img2}></img></div>
                <div className="item"><img src={img3}></img></div>
            </div> 
            </Carousel>
        )
    }
}