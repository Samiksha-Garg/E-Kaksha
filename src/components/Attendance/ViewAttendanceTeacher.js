import React from 'react';
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import DialogBox from "./DialogBox.js";

function ViewAttendanceTeacher({courseId,classId}){
 
 
  const {user} = useContext(Context);
  const [StudentId , setStudentId] = useState([]);
  const [StudentName , setStudentName] = useState([]);
  const [present , setPresent] = useState([]);
  const [step , setStep] = useState(0);

  useEffect(async()=>{
    let stuName=[];
    let relCourseStu=[];
    let stuId=[];
    let presentStu=[];
    const response1 = await axios.get("/relationStuCourse/courseId/" + courseId);
    relCourseStu=response1.data;
    for(let j=0;j<relCourseStu.length;j++){
      stuId.push(relCourseStu[j].studentId);
    }
    setStudentId(stuId);
    
    for(let i=0 ; i<stuId.length ; i++){
      const response2 = await axios.get("/auth/"+ stuId[i]);
      stuName.push({
        Id : stuId[i],
        Name : response2.data.name,
        Attended: false,
      })
    }
    console.log(stuName); 
    const response3 = await axios.get("/class/"+ classId);
    presentStu = response3.data.presentStu;
    for(let i=0 ; i<stuName.length ; i++){
      if(presentStu.includes(stuName[i].Id)){
        stuName[i].Attended=true;
      }
    }
 
    setStudentName(stuName);  
   
  } , [])  

  useEffect(async() =>{
  if(step){
    const response3 = await axios.put("/classes/updatePresentStu/"+classId , present);
  }
  }, [present])
  console.log(StudentName);
  return(
    <div>
      <DialogBox courseId={courseId} classId={classId} studentName={StudentName} onSetPresent={setPresent} present={present} onSetStep={setStep}></DialogBox>
    </div>
  );
    
}

export default ViewAttendanceTeacher;