import React from 'react'
import temp from "../../assets/logo.png"
export default function Contacts() {
  return (
    <div style={{ marginBottom: "12px"}}>
    <img src={temp} style={{ width: "40px",
     height: "40px",
     borderRadius: "50%",
     objectFit: "cover",
     marginRight: "20px",}}/>
    <span><strong>Kajal Kaushal</strong></span>
    </div>
  );
}
