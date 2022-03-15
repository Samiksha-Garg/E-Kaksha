import React from 'react'
import Grid from '@mui/material/Grid';
import Message from './Message';
import "../../styles/chatStyle.css";
export default function Conversation() {
  return (
   <Grid item lg="8" className="converseBox">
      
       <div className='viewMessages'>
        <Message />
        <Message 
            own="true"
        />
        <Message />
        <Message 
            own="true"
        />
       </div>
       <div className='writeMessages'>
       <input type="text" placeholder="Write your message here..." style={{width: "700px", padding:"8px"}}/>
       <button type="submit" style={{width: "100px"}}><strong>Send</strong></button>
       </div>
   </Grid>
  )
}
