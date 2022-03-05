import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import HorizontalNavbarPeopleLogo from "../../assets/Horizontal-Navbar-People-Logo";
import NotificationNavbarIcon from "../../assets/Notification-Navbar";
import { useMemo } from 'react';
import classes from "./topNavBar.module.css";
import Dropdown from 'react-bootstrap/DropdownButton';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddCourseIcon from '../../assets/AddCourseIcon.jsx'
function TopNavbar() {

const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};

  return (
   

    <div className={classes.Navbar }>

        <ul className={classes.ul}>
         
          <Button>
          <AddCourseIcon />
          </Button>
          <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <HorizontalNavbarPeopleLogo /> 
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        placement="bottom-start"
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    

          <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <NotificationNavbarIcon/>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>
          <div>
            <h5>Course Instructor Name</h5>
            <p>Assignment-6 has been added to your course. </p>
            <hr></hr>
          </div>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <div>
            <h5>Course Instructor Name</h5>
            <p>Assignment-6 has been added to your course. </p>
            <hr></hr>
          </div>
        </MenuItem>
        
      </Menu>
              

            
          
        </ul>
    </div>
  );
}

export default TopNavbar;

