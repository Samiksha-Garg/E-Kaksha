import React, { useContext, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Contact from "./Contact";
import Conversation from './Conversation';
import TopNavbar from '../Navigation/topNavbar';
import "../../styles/chatStyle.css";
import { Context } from '../../context/Context';
import axios from 'axios';
export default function Chat() {

  const {user} = useContext(Context);
  const [friends, setFriends] = useState([]);
  const [recentChat, setRecentChats] = useState([]);

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  

  useEffect(async() => {

    let courses = user.courses
    let l = courses.length;

    let students = [];

    for (let i =0; i < l; i++) {
      const response = await axios.get("/chat/students/"+courses[i]);
      let array = response.data
      let len = array.length

      for (let j = 0; j < len; j++) {
        students.push(array[j].studentId);
      }
    }

    var unique = students.filter(onlyUnique);
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

    console.log(map1);

    const rec = []

    for (let i = 0; i < l1; i++) {
      let temp = chats[i].members[0];

      if (temp == user._id) {
        temp = chats[i].members[1];
      }

      rec.push(map1.get(temp));
    }


    setRecentChats(rec);
    setFriends(info);
  }, []) 

  return (
    <div style={{width : "100%"}}>
    <TopNavbar/>
    <Grid style={{display : "flex", width:"100%"}} >
       <Grid item  className="contactBox" lg="4" >
        <div style={{paddingBottom: "8px"}}>
        <input type="text" placeholder="Search Recent Chats" className="searchTab"/>
        </div>
        {recentChat.map((event) => {
          return <Contact name = {event.name}/>
        })} 
       </Grid>
        <Conversation />
        <Grid item  className="contactBox" lg="4" >
        <div style={{paddingBottom: "8px"}}>
        <input type="text" placeholder="Search All Users" className="searchTab"/>
        </div>
        {friends.map((event) => {
          return <Contact name = {event.name}/>
        })} 
       </Grid>
    </Grid>
    </div>
  )
}
