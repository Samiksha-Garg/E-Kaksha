
import axios from "axios";
import React, { useEffect, useState,useContext} from "react";
import { Context } from "../../context/Context";
import CardDisplayAttendance from "./CardDisplayAttendance";
import TableElement from "./tabletemplate";

function AttendancePage(){
    
    const {user} = useContext(Context);
    const [courses , setCourses] = useState([]);
    const [coursesL , setCoursesL] = useState([]);
    const [cardView, setCardView] = useState(true);

    useEffect(async () =>{
        let courseArray = user.courses;
        let coursesData = [];
        let classData = [];
        let attendance;
        let totalAttendance = 0;
        let courseTemp1 = [];
        let courseTemp2 = [];

        

        for(let i=0 ; i<courseArray.length ; i++){

            let temp1 = []
            let temp2 = []
            
            let response1 = await axios.get("/class/courseId/" + courseArray[i]);
            let response2 = await axios.get("/course/" + courseArray[i]);
            
            attendance = 0;
            coursesData = response1.data;
            totalAttendance = coursesData.length
            
            for(let j=0 ; j<coursesData.length ; j++){
                classData = coursesData[j];
                if(classData.presentStu.includes(user._id)){
                    attendance +=1;
                    temp1.push({
                        beginTime : classData.beginTime ,
                        endTime : classData.endTime , 
                        date: classData.date,});
                }else{
                    temp2.push({
                        beginTime : classData.beginTime ,
                        endTime : classData.endTime , 
                        date: classData.date})
                }
            }

            courseTemp1.push({cid : response2.data._id , 
                courseName : response2.data.name , 
                attendance : attendance , 
                totalAttendance : totalAttendance});
            courseTemp2.push({
                cid : response2.data._id ,
                 courseName : response2.data.name , 
                 classesPresentId : temp1 , 
                 classesNotPresentId : temp2
            });
        }

        setCourses(courseTemp1);
        setCoursesL(courseTemp2);

    } , [user])

    const attendanceCardDisplay = () =>{
        // console.log(courses);
        return (<div style={{display : "grid", gridTemplateColumns : "1fr 1fr 1fr", padding : "10px"}}>
            {courses.map((course) =>{
                return <CardDisplayAttendance cid={course.cid} courseName={course.courseName} attendance={course.attendance} totalAttendance={course.totalAttendance}></CardDisplayAttendance>
            })}
        </div>);
    }

    const attendanceTableDisplay = () =>{
        return (
            <div style={{width : "100%"}}>
        <div style={{width : "100%", display : "flex"}}>
        <div style={{width : "20%"}}> <h2> Course Name </h2></div>
        <div style={{width : "35%"}}> <h2>Begin Date And Time</h2></div>
        <div style={{width : "35%"}}> <h2>End Date And Time</h2> </div>
        <div style={{width : "8%"}}> <h2>Attended</h2></div>
        </div>
        <hr></hr>
 
                {coursesL.map((course) =>{
                            return (<div>
                                {course.classesPresentId.map((P) => {
                                    return (<TableElement name={course.courseName} beginTime ={P.beginTime} endTime={P.endTime} attended = "Yes"/>)
                                })}
                                {course.classesNotPresentId.map((NotP) =>{
                                    return (<TableElement name={course.courseName} beginTime ={NotP.beginTime} endTime={NotP.endTime} attended = "No"/>)
                                })}
                                 </div>);
                                 })}
                                
            </div>
        )
     }

    return (
        <div style={{width : "100%"}}>
             <br/>
            <div style={{display : "flex", width : "100%", justifyContent : "space-around"}}>
            <button onClick={() =>{setCardView(true)}}>Card View</button>
            <button onClick={() => {setCardView(false)}}>Table View</button>
            </div>
            <br/>
              {cardView && attendanceCardDisplay()}
              {!cardView && attendanceTableDisplay()}
        </div>
    );
}

export default AttendancePage 





