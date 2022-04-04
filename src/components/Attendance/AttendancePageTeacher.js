import React from 'react';
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../context/Context";

function AttendancePageTeacher({props}){
  const [StudentId , setStudentId] = useState([]);
  const [StudentName , setStudentName] = useState([]);
  const [present , setPresent] = useState([]);

  useEffect(async()=>{
    let stuName=[];
    let stuId=[];
    const response1 = await axios.get("/relationStuCourse/courseId/" + props.courseId);
    stuId=response1.data.studentId;
    setStudentId(stuId);
    for(let i=0 ; i<stuId.length ; i++){
      const response2 = await axios.get("/user/"+ stuId[i]);
      stuName.push({
        Id : stuId[i],
        Name : response2.data.name,
      })
    }
    setStudentName(stuName);   
  } , [user])  

  useEffect(async() =>{
    const response2 = await axios.get("/classes/"+ props.classId);

    /*const response1 = await axios.post("/quiz/" , {
      userId : user._id,
      ans: results,
      marks : marks,
  });*/
  }, [present])

  return(
    <div>
      <AttendanceTeacherClass courseId={props.courseId} classId={props.classId} studentName={StudentName} onSetPresent={setPresent} present={present}></AttendanceTeacherClass>
    </div>
  );
    
}

export default AttendancePageTeacher;