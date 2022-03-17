import React, {useRef, useState } from 'react'
import Grid from '@mui/material/Grid';
import Message from './Message';
import "../../styles/chatStyle.css";
export default function Conversation({friend}) {

  return (
   <Grid item lg="8" className="converseBox" style={{flexDirection : "column"}}>
       {friend ?
<>
       <div className='profile'>
           <center><h2>{friend.name}</h2></center>
       </div>
      
       <div className='viewMessages'>
        <Message />
        <Message 
            own="true"
        />
        <Message />
        <Message 
            own="true"
        />
        <Message 
            own="true"
        />
        <Message 
            own="true"
        />
       </div>

       <div className='writeMessages'>
       <input type="text" placeholder="Write your message here..." style={{width: "80%", padding:"8px"}}/>
       <button type="submit" style={{width: "100px"}}><strong>Send</strong></button>
       </div>
       </> : <div style={{position : "relative", height : "100%"}}>
           <span className='noConvo'>Open a Conversation to start a chat</span>
       </div>
}
   </Grid>
      
  )
}
