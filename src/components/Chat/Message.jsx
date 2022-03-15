import React from 'react'
import "../../styles/chatStyle.css";
export default function Message({own}) {
  return (
    <div className={own ? "message own" : "message"}>
      
        <p className="messageText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
      
     
    </div>
  )
}
