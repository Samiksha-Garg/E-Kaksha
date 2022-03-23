import React from 'react'
import temp from "../../assets/logo.png"
import "../../styles/chatStyle.css";
export default function Contacts({name,isOnline}) {
  return (
    
  <div className='contact' onClick={() => {
    }} style={{ marginBottom: "12px"}}>
    <img src={temp} style={{ width: "40px",
     height: "40px",
     borderRadius: "50%",
     objectFit: "cover",
     marginRight: "12px"
     }}/> 
    <span><strong>{name}</strong></span>
     {isOnline && <span style={{color: "green", marginLeft: "65px"}}>Online</span>}
  
  
  </div>
  );
}
