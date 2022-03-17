import React from 'react'
import './Card.css' 
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import CardImg0 from "./CardImg0.jpg"
import CardImg1 from "./CardImg1.png"
import { resolvePath } from 'react-router-dom';

function CardT(props)
{

const array = [CardImg0, CardImg1];
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
