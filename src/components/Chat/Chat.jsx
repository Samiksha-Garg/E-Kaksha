import React from 'react'
import { useContext, useEffect, useRef, useState } from "react";
import Grid from '@mui/material/Grid';
import Contact from "./Contact";
import Contact2 from './Contact2';
import Message from './Message';
import TopNavbar from '../Navigation/topNavbar';
import "../../styles/chatStyle.css";
import { Context } from '../../context/Context';
import axios from 'axios';
import { io } from "socket.io-client";

export default function Chat() {

  const {user} = useContext(Context);
  const [friends, setFriends] = useState([]);
  const [recentChat, setRecentChats] = useState([]);
  const [convo, setConvo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMsg,setArrivalMsg]=useState(null);
  const socket=useRef();
 
  useEffect(()=>{
   socket.current=io("ws://localhost:8900");
   //getting message from server
  socket.current.on("getMessage",(msg)=>{
      setArrivalMsg({
        senderId: msg.senderId,
        text: msg.text
      })
  })
  },[])
  useEffect(()=>{
      if(arrivalMsg){
        convo?.event._id===arrivalMsg.senderId && setMessages((prev)=>[...prev,arrivalMsg]);
      }
  },[arrivalMsg,convo])

  
  useEffect(()=>{
    //sending to server
    socket.current.emit("addUser",user._id);
    socket.current.on("getUsers",users=>{
      console.log(users);
    })
  },[user]);
  useEffect(async() => {
    if (convo) {
        const response = await axios.get("/message/" + convo.chatId);
        setMessages(response.data);
    } else {
        setMessages([]);
    }
    
  }, [convo])
  const sendMessage = async (e) => {
    if (newMessage == "") {
        return;
    }
    e.preventDefault();
    const msg = {
        senderId : user._id,
        text : newMessage,
        chatId : convo.chatId
    };
    //to send message to server
    socket.current.emit("sendMessage",{
      senderId: user._id,
      receiverId: convo.prof._id,
      text : newMessage,
    });

    const res = await axios.post("/message", msg);
    setMessages([...messages, res.data]);
    setNewMessage("");

}
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  

  useEffect(async() => {

    let courses = user.courses
    let l = courses.length;

    let peers = [];

    if (user.role === "teacher") {
      for (let i =0; i < l; i++) {
        const response = await axios.get("/chat/students/"+courses[i]);
        let array = response.data
        let len = array.length
  
        for (let j = 0; j < len; j++) {
          peers.push(array[j].studentId);
        }
      }
    } else {
      for (let i = 0; i < l; i++) {
        const response = await axios.get("/chat/teacher/" + courses[i]);
        peers.push(response.data.teacherId);
      }
    }
    
    var unique = peers.filter(onlyUnique);
    let len = unique.length
    let info = []

    const map1 = new Map();

    for (let i = 0; i < len; i++) {
      const response = await axios.get("/auth/"+unique[i]);
      map1.set(unique[i], response.data);
      info.push(response.data);
    }


    const recent = await axios.get("/chat/" + user._id);

    let chats = recent.data
    let l1 = chats.length
    const rec = []

    for (let i = 0; i < l1; i++) {
      let temp = chats[i].members[0];

      if (temp == user._id) {
        temp = chats[i].members[1];
      }

      rec.push({
        prof : map1.get(temp),
        chatId : chats[i]._id
      });
    }


    setRecentChats(rec);
    setFriends(info);
  }, []) 

  const handleAllChat = async(event) => {
    console.log(event);
    let l = recentChat.length

    for (let i = 0; i < l; i++) {
      if (recentChat[i].prof._id == event._id) {
        setConvo(recentChat[i]);
        return;
      }
    }

    const newChat = await axios.post("/chat", {
      members : [
        event._id,
        user._id
      ]
    });
    setConvo({
      prof : event,
      chatId: newChat.data._id
    });

    setRecentChats((vals) => {
      return [...vals, {
        prof : event,
        chatId: newChat.data._id
      }]
    });

    console.log(newChat);
  }
  return (
    <div style={{width : "100%", height : "100%"}}>
    <TopNavbar/>
    <Grid style={{display : "flex", width:"100%"}} >
       <Grid item  className="contactBox" lg="4" >
        <div style={{paddingBottom: "8px"}}>
        <input type="text" placeholder="Search Recent Chats" className="searchTab"/>
        </div>
        {recentChat.map((event) => {
          return <Contact key = {event.chatId} name = {event.prof.name} friend={event} choose = {setConvo}/>
        })} 
       </Grid>
       <Grid item lg="8" className="converseBox" style={{flexDirection : "column"}}>
       {convo ?
<>
       <div className='profile'>
           <center><h2>{convo.prof.name}</h2></center>
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
        <Grid item  className="contactBox" lg="4" >
        <div style={{paddingBottom: "8px"}}>
        <input type="text" placeholder="Search All Users" className="searchTab"/>
        </div>
        {friends.map((event) => {
          return <div key = {event._id} onClick={() => {handleAllChat(event)}}> <Contact2 name = {event.name}/></div>
        })} 
       </Grid>
    </Grid>
    </div>
  )
}
