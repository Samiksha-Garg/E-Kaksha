import React from 'react';
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import AttendanceTeacherClass from './AttendanceTeacherClass';

function AttendancePageTeacher({props}){
  const {user} = useContext(Context);
  const [StudentId , setStudentId] = useState([]);
  const [StudentName , setStudentName] = useState([]);
  const [present , setPresent] = useState([]);
  const [step , setStep] = useState(0);

  useEffect(async()=>{
    let stuName=[];
    let stuId=[];
    let presentStu=[];
    const response1 = await axios.get("/relationStuCourse/courseId/" + props.courseId);
    stuId=response1.data.studentId;
    //setStudentId(stuId);
    for(let i=0 ; i<stuId.length ; i++){
      const response2 = await axios.get("/auth/"+ stuId[i]);
      stuName.push({
        Id : stuId[i],
        Name : response2.data.name,
        Attended : false,
      })
    }
      
    const response2 = await axios.get("/classes/"+ props.classId);
    presentStu = response2.data.presentStu;
    for(let i=0 ; i<stuName.length ; i++){
      if(presentStu.includes(stuName[i].Id)){
        stuName[i].Attended=true;
      }
    }
    setStudentName(stuName); 

  } , [])  

  useEffect(async() =>{
   //const response2 = await axios.put("/classes/"+ props.classId);

    /*const response1 = await axios.post("/quiz/" , {
      userId : user._id,
      ans: results,
      marks : marks,
  });*/

  if(step){
    const response3 = await axios.put("/classes/updatePresentStu/"+props.classId , present);
  }
  }, [present])

  return(
    <div>
      <AttendanceTeacherClass courseId={props.courseId} classId={props.classId} studentName={StudentName} onSetPresent={setPresent} present={present} onSetStep={setStep}></AttendanceTeacherClass>
    </div>
  );
    
}

export default AttendancePageTeacher;