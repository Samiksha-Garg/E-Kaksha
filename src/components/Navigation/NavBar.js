import { Link } from "react-router-dom";
import { useState } from "react";

import Home from "../../assets/Home";
import BarsIcon from "../../assets/Bars-icon";
import ChatIcon from "../../assets/Chat-icon";
import CalendarIcon from "../../assets/Calendar-icon";
import AssignmentIcon from "../../assets/Assignment-icon";
import AttendenceIcon from "../../assets/Attendence-icon";

import classes from './NavBar.module.css';

function NavBar() {

  const[isOpenNavBar,setOpenNavBar]=useState(false);
 
  const changeState=()=>setOpenNavBar(!isOpenNavBar);

  return (
    <div className="">
    <div className={classes.Navbar } style={{ width : isOpenNavBar ?'200px': '43px'}}>
        <ul className={classes.ul}>
          <li onClick={changeState} className={classes.link} >
            <BarsIcon /> E-Kaksha
          </li>
          <li>
            <Link to="/" className={classes.link}>
              <Home />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/assignments" className={classes.link}>
              <AssignmentIcon />
              Assignments
            </Link>
          </li>
          <li>
            <Link to="/chat" className={classes.link}>
              <ChatIcon />
              Chat
            </Link>
          </li>
          <li>
            <Link to="/attendence" className={classes.link}>
              <AttendenceIcon />
              Attendance
            </Link>
          </li>
          <li>
            <Link to="/calendar" className={classes.link}>
              <CalendarIcon />
              Calendar
            </Link>
          </li>
        </ul>
    </div>
    </div>
  );
}

export default NavBar ;
