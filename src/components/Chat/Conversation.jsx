import React, {useEffect, useRef, useState } from 'react'
import Grid from '@mui/material/Grid';
import Message from './Message';
import "../../styles/chatStyle.css";
import axios from 'axios';
export default function Conversation({friend, user}) {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(async() => {
        if (friend) {
            const response = await axios.get("/message/" + friend.chatId);
            setMessages(response.data);
        } else {
            setMessages([]);
        }
        
    }, [friend])

    const sendMessage = async (e) => {
        if (newMessage == "") {
            return;
        }
        e.preventDefault();
        const msg = {
            senderId : user._id,
            text : newMessage,
            chatId : friend.chatId
        };

        const res = await axios.post("/message", msg);
        setMessages([...messages, res.data]);
        setNewMessage("");

    }

  return (
   <Grid item lg="8" className="converseBox" style={{flexDirection : "column"}}>
       {friend ?
<>
       <div className='profile'>
           <center><h2>{friend.prof.name}</h2></center>
       </div>
      
       <div className='viewMessages'>
       {messages.map((event) => {
          return <Message own={event.senderId == user._id} text={event.text}/>
        })}
       </div>

       <div className='writeMessages'>
       <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}  placeholder="Write your message here..." style={{width: "80%", padding:"8px"}}/>
       <button onClick={sendMessage} type="submit" style={{width: "100px"}}><strong>Send</strong></button>
       </div>
       </> : <div style={{position : "relative", height : "100%"}}>
           <span className='noConvo'>Open a Conversation to start a chat</span>
       </div>
}
   </Grid>
      
  )
}
