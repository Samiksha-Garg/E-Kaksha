import React from 'react';
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import DialogBox from "./DialogBox.js";
import { ToastContainer, toast} from 'react-toastify';
toast.configure()

function ViewAttendanceTeacher({courseId,classId}){
 
 
  const {user} = useContext(Context);
  const [StudentId , setStudentId] = useState([]);
  const [StudentName , setStudentName] = useState([]);
  const [present , setPresent] = useState([]);
  const [step , setStep] = useState(0);
  const [presentStu, setPresentStu] = useState([]);

  const notify = ()=>{
 
    // Calling toast method by passing string
    toast.success('Saved attendance successfully',  {position: toast.POSITION.BOTTOM_CENTER})

}

  useEffect(async()=>{
    let stuName=[];
    let relCourseStu=[];
    let stuId=[];
    let presentStu=[];
    let temp = [];
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
        temp.push(stuName[i].Id);
        stuName[i].Attended=true;
      }
    }
 
    setStudentName(stuName);  
    setPresentStu(temp);
   
  } , [])  

  useEffect(async() =>{
  if(step){
    const response3 = await axios.put("/class/updatePresentStu/"+classId , present);
    notify();
  }
  }, [present])
  console.log(StudentName);
  return(
    <div>
      <DialogBox courseId={courseId} presentStudents={presentStu} classId={classId} studentName={StudentName} onSetPresent={setPresent} present={present} onSetStep={setStep}></DialogBox>
    </div>
  );
    
}

export default ViewAttendanceTeacher;