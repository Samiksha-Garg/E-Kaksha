import React from 'react';
import { useState} from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog
} from "@mui/material";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";



function DialogBox({courseId,classId,studentName,onSetPresent,present,onSetStep}){
    // console.log(studentName);
     let presentStu =[];
     const [subModal, setSubModal] = useState(false);
    
    const changeHandler1 = (e)=>{
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
        
    }
        
    const handleClose = () => {
      onSetStep(1);
        onSetPresent(presentStu);
      };
    

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
                Attendance
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
            </Toolbar>
          </AppBar>
          <List>
          {studentName.map((event) => {
              return (
                <div>
                  <ListItem >
                    <ListItemText
                      primary={event.Name}
                    />
                  
                  <input type="checkbox"  value={event.Id} onChange={changeHandler1}  defaultChecked={event.Attended}></input>
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

export default DialogBox;