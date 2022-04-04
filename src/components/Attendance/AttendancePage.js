import axios from "axios";
import React, { useEffect, useState,useContext} from "react";
import { Context } from "../../context/Context";
import CardDisplayAttendance from "./CardDisplayAttendance";
import AttendanceCardDisplay from "./AttendanceCardDisplay";
import AttendanceTableDisplay from "./AttendanceTableDisplay";

function AttendancePage(){
    
    /*const [user ,dispatch] = useContext(Context);
    const [courses , setCourses] = useState([]);
    const [coursesL , setCoursesL] = useState([]);
    const [classesPresentId, setClassesPresentId] = useState([])
    const [classesNotPresentId , setClassesNotPresentId] = useState([])*/

    

   /* useEffect(async () =>{
        let courseArray = user.courses;
        let classesPresentId = [];
        let classesNotPresentId = [];
        let coursesData = [];
        let classData = [];
        let attendance;

        for(let i=0 ; i<courseArray.length ; i++){
            let response1 = await axios.get("/course/" + courseArray[i]);
            attendance = 0;
            coursesData = response1.data;
            for(let j=0 ; j<coursesData.classes.length ; j++){
                let response2 = await axios.get("/"+ coursesData.classes[j]);
                classData = response2.data;
                if(classData.presentStu.includes(user._id)){
                    attendance +=1;
                    setClassesPresentId((prevState) => [...prevState , {classesId: coursesData.classes[j] , 
                        beginTime : classData.beginTime ,
                        endTime : classData.endTime , 
                        date: classData.date,}]);
                }else{
                    setClassesNotPresentId((prevState) => [...prevState , {classesId: coursesData.classes[j] , 
                        beginTime : classData.beginTime ,
                        endTime : classData.endTime , 
                        date: classData.date}]);
                }
            }

            setCourses((prevState) => [...prevState , {cid : courseArray[i] , 
                courseName : courseArray[i].name , 
                attendance : attendance , }]);
            setCoursesL((prevState) => [...prevState , {cid : courseArray[i] ,
                 courseName : courseArray[i].name , 
                 classesPresentId : classesPresentId , 
                 classesNotPresentId : classesNotPresentId,}]);
        }
    } , [user])*/

    const courses=[];
    courses.push({cid : 1 , courseName : "Comp" , attendance : 2,})
    courses.push({cid : 2 , courseName : "OS" , attendance : 3,})
    const coursesL=[];
    coursesL.push({cid : 1 , courseName : "Comp" , attendance : 2,})
    coursesL.push({cid : 2 , courseName : "OS" , attendance : 3,})

    const classesPresentId=[];
    classesPresentId.push({classesId:101 , beginTime : 1 , endTime : 2 ,date:3});
    classesPresentId.push({classesId:102 , beginTime:1,endTime:2 , date:3});
    const classesNotPresentId=[];
    classesNotPresentId.push({classesId:103 , beginTime : 1 , endTime : 2 ,date:3});
    classesNotPresentId.push({classesId:104 , beginTime : 1 , endTime : 2 ,date:3});

    const attendanceCardDisplay = () =>{
        return (<div> 
           {courses.map((course) =>{
return <CardDisplayAttendance cid={course.cid} courseName={course.courseName} attendance={course.attendance}></CardDisplayAttendance>
})}
        </div>);
    }

    const attendanceTableDisplay = () =>{
        return(<div>
            <table>
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Class Title</th>
                        <th>Begin Time</th>
                        <th>End Time</th>
                        <th>Date</th>
                        <th>Attended</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {coursesL.map((course) =>{
                            return (<div>
                                {classesPresentId.map((P) => {
                                    return (<div>
                                        <td>{course.courseName}</td>
                                        <td>{P.classesId}</td>
                                        <td>{P.beginTime}</td>
                                        <td>{P.endTime}</td>
                                        <td>{P.date}</td>
                                        <td>Yes</td>
                                    </div>)
                                })}
                                {classesNotPresentId.map((NotP) =>{
                                    return (<div>
                                        <td>{course.courseName}</td>
                                        <td>{NotP.classesId}</td>
                                        <td>{NotP.beginTime}</td>
                                        <td>{NotP.endTime}</td>
                                        <td>{NotP.date}</td>
                                        <td>No</td>
                                    </div>)
                                })}
                            </div>);
                        })}
                    </tr>
                </tbody>
            </table>
        </div>);
    }

    return (
        <div>
            {courses.map((course) =>{
return <CardDisplayAttendance cid={course.cid} courseName={course.courseName} attendance={course.attendance}></CardDisplayAttendance>
})}
        </div>
    );
}

export default AttendancePage 

/*
            <button onClick={attendanceCardDisplay}>Card Display</button>
            <button onClick={attendanceTableDisplay}>Table Display</button>
{courses.map((course) =>{
return <CardDisplayAttendance cid={course.cid} courseName={course.courseName} attendance={course.attendance}></CardDisplayAttendance>
})}
*/

/*
    const courses=[];
    courses.push({cid : 1 , courseName : "Comp" , attendance : 2,})
    courses.push({cid : 2 , courseName : "OS" , attendance : 3,})
    const coursesL=[];
    coursesL.push({cid : 1 , courseName : "Comp" , attendance : 2,})
    coursesL.push({cid : 2 , courseName : "OS" , attendance : 3,})

    const classesPresentId=[];
    classesPresentId.push({classesId:101});
    classesPresentId.push({classesId:102});
    const classesNotPresentId=[];
    classesNotPresentId.push({classesId:103});
    classesNotPresentId.push({classesId:104});
*/
