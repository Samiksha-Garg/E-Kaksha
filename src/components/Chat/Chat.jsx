import React from 'react'
import Grid from '@mui/material/Grid';
import Contact from "./Contact";
import Conversation from './Conversation';
import "../../styles/chatStyle.css";
export default function Chat() {
  return (
    <Grid container >
       <Grid item  className="contactBox" lg="4" >
        <div style={{paddingBottom: "8px"}}>
        <input type="text" placeholder="Search Contact" className="searchTab"/>
        </div>
        <Contact />
        <Contact />
       </Grid>
        <Conversation />
    </Grid>
  )
}
