import React from 'react';
import { useState, useContext, useEffect } from "react";
//import ReactFileReader from "react-file-reader";
import axios from "axios";
//import { Context } from "../context/Context";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
//import Sample from "../PdfView/Sample";
// imports for frontend
//import styles from "./assign.module.css";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
} from "@mui/material";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Checkbox } from '@mui/material';
import Slide from '@mui/material/Slide';
import { SettingsRemoteSharp } from '@mui/icons-material';

function AttendanceTeacherClass({props}){
    const studentName=[];
    let presentStu =[];
    const [subModal, setSubModal] = useState(false);
    const [checked , setChecked] = useState(false);
    const [open, setOpen] = useState(false);
    
    const changeHandler = (e)=>{
        setChecked(e.target.checked);
        
        console.log(e.target.value);
    }

    const changeHandler1 = (e)=>{
      console.log("Om");
       

        if(e.target.checked && !presentStu.includes(e.target.value)){
            presentStu.push(e.target.value);
            for(let i=0 ; i<studentName.length ; i++){
              console.log(e.target.value);
              console.log(studentName[i].Attended);
              if(e.target.value==studentName[i].Id){
                studentName[i].Attended=true;
                console.log(i);
                break;
              }
            }
        }
        if(!(e.target.checked) && presentStu.includes(e.target.value)){
            presentStu = presentStu.filter((ele) =>{return ele != e.target.value;})
            for(let i=0 ; i<studentName.length ; i++){
              console.log(e.target.value);
              console.log(studentName[i].Attended);
              if(e.target.value==studentName[i].Id){
                studentName[i].Attended=false;
                console.log(i);
                break;
              }
            }
        }
        //console.log(presentStu);
    }
        
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      props.onSetStep(1);
        props.onSetPresent(presentStu);
      };
    studentName.push({
        Name : "Suhani",
        Id : "1",
        Attended : true,
    });
    studentName.push({
        Name : "Bajpai",
        Id : "2",
        Attended : false,
    });

    return (
        <div>

      <Button variant="outlined" onClick={() => {
            setSubModal(true);
          }}>
        Mark Attendance
      </Button>

      <Dialog
          fullScreen
          open={subModal}
          onClose={() => {
            setSubModal(false);
          }}
        >
          <AppBar sx={{ position: "relative" }}>
          <Toolbar>
          <IconButton
                edge="start"
                color="inherit"
                onClick={() => setSubModal(false)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Assignment: Hello
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
            </Toolbar>
          </AppBar>
          <List>
          {studentName.map((event , i) => {
              return (
                <div>
                  <ListItem >
                    <ListItemText
                      primary={event.Name}
                    />
                   <FormControlLabel  control={<Checkbox defaultChecked={event.Attended} onChange={changeHandler1} ></Checkbox>} value={event.Id} ></FormControlLabel>
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List>
          </Dialog>
        </div>
    );
}

export default AttendanceTeacherClass;