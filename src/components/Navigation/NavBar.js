import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import Home from "../../assets/Home";
import BarsIcon from "../../assets/Bars-icon";
import ChatIcon from "../../assets/Chat-icon";
import CalendarIcon from "../../assets/Calendar-icon";
import AssignmentIcon from "../../assets/Assignment-icon";
import AttendenceIcon from "../../assets/Attendence-icon";

import classes from './NavBar.module.css';
import { Context } from "../../context/Context";


function NavBar() {

  const[isOpenNavBar,setOpenNavBar]=useState(false);
  const {user} = useContext(Context)
 
  const changeState=()=>setOpenNavBar(!isOpenNavBar);
  

  return (
    <div className="">
    <div className={classes.Navbar } style={{ width : isOpenNavBar ?'200px': '43px'}}>
        <ul className={classes.ul}>
          <li onClick={changeState} className={classes.link} >
            <BarsIcon />
            {isOpenNavBar && 'E-Kaksha'}
          </li>
          <li>
            <Link to="/" className={classes.link}>
              <Home />
              {isOpenNavBar && 'Home'}
            </Link>
          </li>
         {user.role == "student" &&  <li>
            <Link to="/assignments" className={classes.link}>
              <AssignmentIcon />
              {isOpenNavBar && 'Assignments'}
            </Link>
          </li>}
          <li>
            <Link to="/chat" className={classes.link}>
              <ChatIcon />
              {isOpenNavBar && 'Chat'}
            </Link>
          </li>
          <li>
            <Link to="/attendance" className={classes.link}>
              <AttendenceIcon />
              {isOpenNavBar && 'Attendance'}
            </Link>
          </li>
          <li>
            <Link to="/calendar" className={classes.link}>
              <CalendarIcon />
              {isOpenNavBar && 'Calendar'}
            </Link>
          </li>
        </ul>
    </div>
    </div>
  );
}

export default NavBar;
