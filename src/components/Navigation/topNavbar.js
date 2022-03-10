import { Link } from "react-router-dom";
import { useState, useContext } from "react";
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
import Avatar from '@mui/material/Avatar'
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Context } from "../../context/Context";
import {JoinCourseTitle, JoinCourse} from "./joinCourse";
import { AddCourse, AddCourseTitle } from "./addCourse";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
function TopNavbar() {

const [anchorEl1, setAnchorEl1] = useState(null);
const [anchorEl2, setAnchorEl2] = useState(null);
const open1 = Boolean(anchorEl1);
const open2 = Boolean(anchorEl2);
const {dispatch,isFetching}=useContext(Context);
const [showModal, setShowModal] = useState(false);

const handleClick2 = (event) => {
  setAnchorEl2(event.currentTarget);
};

const handleClose2 = () => {
  setAnchorEl2(null);
};

const handleClick1 = (event) => {
  setAnchorEl1(event.currentTarget);
};
const handleClose1 = () => {
  setAnchorEl1(null);
};

const handleLogOut = () => {
  dispatch({type:"LOGOUT"});
}

  return (
   

    <div className={classes.Navbar }>

        <ul className={classes.ul}>
        <Button onClick={() => {
            setShowModal(true);
          }}>
          <AddCourseIcon />
      </Button>
         
          <Button
        id="demo-positioned-button"
        aria-controls={open1 ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open1 ? 'true' : undefined}
        onClick={handleClick1}
      >
        <HorizontalNavbarPeopleLogo /> 
      </Button>
      <Menu
        anchorEl={anchorEl1}
        id="account-menu"
        open={open1}
        onClose={handleClose1}
        onClick={handleClose1}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        
        <Divider />
        
        <MenuItem >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      {/* <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl1}
        open={open1}
        placement="bottom-start"
        onClose={handleClose1}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem >Profile</MenuItem>
        <MenuItem >My account</MenuItem>
        <MenuItem >Logout</MenuItem>
      </Menu> */}
    

          <Button
        id="demo-positioned-button"
        aria-controls={open2 ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open2 ? 'true' : undefined}
        onClick={handleClick2}
      >
        <NotificationNavbarIcon/>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl2}
        open={open2}
        onClose={handleClose2}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <div>
            <h5>Course Instructor Name</h5>
            <p>Assignment-6 has been added to your course. </p>
            <hr></hr>
          </div>
        </MenuItem>
        <MenuItem >
        <div>
            <h5>Course Instructor Name</h5>
            <p>Assignment-6 has been added to your course. </p>
            <hr></hr>
          </div>
        </MenuItem>
        
      </Menu>
      <Dialog
            PaperProps={{
              style: {
                overflow: "visible",
              },
            }}
            onClose={() => {
              setShowModal(false);
            }}
            open={showModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
 
            <DialogTitle id="alert-dialog-title">
              {/* <JoinCourseTitle setShowModal={setShowModal}/> */}
              <AddCourseTitle setShowModal={setShowModal}/>
              </DialogTitle>
              <DialogContent>
              <DialogContentText id="alert-dialog-description">
              <AddCourse setShowModal={setShowModal}/>
              {/* <JoinCourse setShowModal={setShowModal}/> */}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </ul>
    </div>
  );
}

export default TopNavbar;

