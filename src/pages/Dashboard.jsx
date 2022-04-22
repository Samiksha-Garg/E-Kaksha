import CardT from "../components/Card/CardT.js"
import React, {useState, useEffect, useContext} from 'react'
import TopNavbar from "../components/Navigation/topNavbar.js";
import { Context } from "../context/Context.js";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import {
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";

function DashBoard(){

      const {user} = useContext(Context);
      const [userCourses, setCourses] = useState([])
      const [isFetching, setFetching] = useState(true);

      useEffect(async () => {
            let courseArray = user.courses;
            let l = courseArray.length;
            let courses = []
            for (let i = 0; i < l; i++) {
                  // console.log(courseArray[i]);
                  const res = await axios.get("/course/" + courseArray[i]);
                  // console.log(res.data);
                  courses.push(res.data);
            }                
           setCourses(courses);
           setFetching(false);
      },[user])

      

    return(
        <div>
      <Dialog
            PaperProps={{
              style: {
                overflow: "visible",
              },
            }}
            open={isFetching}
            
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <CircularProgress/>
              
              </DialogContentText>
            </DialogContent>
          </Dialog>

<TopNavbar />
{userCourses.length == 0 && 
         <center> <p>No Courses!</p></center>
        } 
{userCourses.map((event) => {
          return <CardT courseId={event._id} title={event.name} ImageUrl={event.image} body = {event.desc} />;
        })} 
      </div>    
    )
}

export default DashBoard;