import React from 'react'
import './Card.css' 
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import CardImg0 from "./CardImg0.jpg"
import CardImg1 from "./CardImg1.png"
import CardImg2 from "./CardImg2.png"
import CardImg3 from "./CardImg3.jpg"
import CardImg4 from "./CardImg4.png"
import CardImg5 from "./CardImg5.jpg"
import CardImg6 from "./CardImg6.jpg"
import CardImg7 from "./CardImg7.jpeg"
import CardImg8 from "./CardImg8.jpg"
import { resolvePath } from 'react-router-dom';

function CardT(props)
{

const array = [CardImg0, CardImg1, CardImg2, CardImg3, CardImg4, CardImg5, CardImg6, CardImg7, CardImg8];
return (
<div className='card-style' >
<div className="card-container">
    <div className = 'image-container'>
    <img src={array[props.ImageUrl]} ></img>
</div>
<div classsName="card-content">
    <div className="card-title">
        <h3> {props.title}</h3>
    </div>
    <div className="card-body">
    <p> {props.body}</p>
    </div>
</div>

<div className="btn">
    <button>
        <a href="https://www.google.co.in/">
            View More
        </a>
    </button>
</div>
</div>
</div>
    );
}

export default CardT
