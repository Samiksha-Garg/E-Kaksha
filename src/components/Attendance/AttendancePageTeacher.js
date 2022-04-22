import React, { useState, useEffect, useContext } from "react";
// import Card from 'react-bootstrap/Card';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Context } from "../../context/Context.js";
import axios from "axios";
import ViewAttendanceTeacher from "./ViewAttendanceTeacher";

function Attendance() {
  const { user } = useContext(Context);
  const [finalArr, setArray] = useState([]);
  
  useEffect(async () => {
    let courseArray = user.courses;
    let l = courseArray.length;
    let arr = [];
    for (let i = 0; i < l; i++) {
      const res = await axios.get("/course/" + courseArray[i]);
      const res2 = await axios.get("/class/courseid/" + courseArray[i]);

      arr.push({ course: res.data, clas: res2.data });
    }
    setArray(arr);
  }, [user]);

  return (
    <div>
      <h1 style={{ color: "blueviolet" }}>Attendance</h1>

      {finalArr.map((event) => {
        return (
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {event.course.name} {event._id}
              </Typography>

              <Typography sx={{ mb: 1.5 }} color="text.primary">
                Classes
              </Typography>

              {event.clas.map((e) => {
                {/* console.log(e.courseId);
                console.log(e._id); */}
                return (
                  <div>
                    <span>Date:{e.date} </span>&nbsp; &nbsp;
                    <ViewAttendanceTeacher
                      courseId={e.courseId}
                      classId={e._id}
                    />
                    {/* <Button variant="outlined" value={e} onChange={handleView}>View Attendance</Button> */}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default Attendance;
