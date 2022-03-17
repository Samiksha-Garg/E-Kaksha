import React from 'react'
import temp from "../../assets/logo.png"
export default function Contacts({name}) {
  return (
    <div className='contact' onClick={() => {
    }} style={{ marginBottom: "12px"}}>
    <img src={temp} style={{ width: "40px",
     height: "40px",
     borderRadius: "50%",
     objectFit: "cover",
     marginRight: "20px",}}/>
    <span><strong>{name}</strong></span>
    </div>
  );
}
