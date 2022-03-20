import React from 'react'
import './Card.css' 
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import CardImg from "./CardImg.js"

import pic from "./CardImg.jpg"
import { Link, resolvePath } from 'react-router-dom';

function CardT(props)
{
return (
<div className='card-style' >
<div className="card-container">
    <div className = 'image-container'>
    <img src={pic} alt={pic}></img>
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
        <Link to="/coursepage">
            View More!
        </Link>
    </button>
</div>
</div>
</div>
    );
}

export default CardT


 