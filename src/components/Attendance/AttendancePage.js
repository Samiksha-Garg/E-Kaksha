import axios from "axios";
import React, { useEffect, useState,useContext} from "react";
import { Context } from "../../context/Context";
import CardDisplayAttendance from "./CardDisplayAttendance";
import TableElement from "./tabletemplate";

function AttendancePage(){
    
    const {user ,dispatch} = useContext(Context);
    const [courses , setCourses] = useState([]);
    const [coursesL , setCoursesL] = useState([]);
    const [classesPresentId, setClassesPresentId] = useState([])
    const [classesNotPresentId , setClassesNotPresentId] = useState([])
    const [cardView, setCardView] = useState(true);

    useEffect(async () =>{
        let courseArray = user.courses;
        let classesPresentId = [];
        let classesNotPresentId = [];
        let coursesData = [];
        let classData = [];
        let attendance;

        let temp1 = []
        let temp2 = []

        for(let i=0 ; i<courseArray.length ; i++){
            
            let response1 = await axios.get("/class/courseId/" + courseArray[i]);
            let response2 = await axios.get("/course/" + courseArray[i]);
            
            attendance = 0;
            coursesData = response1.data;
            for(let j=0 ; j<coursesData.length ; j++){
                classData = coursesData[j];
                if(classData.presentStu.includes(user._id)){
                    attendance +=1;
                    temp1.push({
                        beginTime : classData.beginTime ,
                        endTime : classData.endTime , 
                        date: classData.date,});
                    
                    // setClassesPresentId((prevState) => [...prevState , {
                    //     beginTime : classData.beginTime ,
                    //     endTime : classData.endTime , 
                    //     date: classData.date,}]);
                }else{
                    temp2.push({
                        beginTime : classData.beginTime ,
                        endTime : classData.endTime , 
                        date: classData.date})
                    // setClassesNotPresentId((prevState) => [...prevState , {
                    //     beginTime : classData.beginTime ,
                    //     endTime : classData.endTime , 
                    //     date: classData.date}]);
                }
            }

            setClassesPresentId(temp1);
            setClassesNotPresentId(temp2);

            setCourses((prevState) => [...prevState , {cid : response2.data._id , 
                courseName : response2.data.name , 
                attendance : attendance , }]);
            setCoursesL((prevState) => [...prevState , {cid : response2.data._id ,
                 courseName : response2.data.name , 
                 classesPresentId : temp1 , 
                 classesNotPresentId : temp2,}]);
        }
    } , [user])

    const attendanceCardDisplay = () =>{
        // console.log(courses);
        return (<div>
            {courses.map((course) =>{
                return <CardDisplayAttendance cid={course.cid} courseName={course.courseName} attendance={course.attendance}></CardDisplayAttendance>
            })}
        </div>);
    }

    const attendanceTableDisplay = () =>{
        return (<TableElement/>)
    //     return(<div>
    //         <table>
    //             <thead>
    //                 <tr>
    //                     <th>Course Name</th>
    //                     <th>Begin Time</th>
    //                     <th>End Time</th>
    //                     <th>Date</th>
    //                     <th>Attended</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 <tr>
    //                     {coursesL.map((course) =>{
    //                         return (<div>
    //                             {course.classesPresentId.map((P) => {
    //                                 return (<div>
    //                                     <td>{course.courseName}</td>
    //                                     <td>{P.beginTime}</td>
    //                                     <td>{P.endTime}</td>
    //                                     <td>{P.date}</td>
    //                                     <td>Yes</td>
    //                                 </div>)
    //                             })}
    //                             {course.classesNotPresentId.map((NotP) =>{
    //                                 return (<div>
    //                                     <td>{course.courseName}</td>
    //                                     <td>{NotP.beginTime}</td>
    //                                     <td>{NotP.endTime}</td>
    //                                     <td>{NotP.date}</td>
    //                                     <td>No</td>
    //                                 </div>)
    //                             })}
    //                         </div>);
    //                     })}
    //                 </tr>
    //             </tbody>
    //         </table>
    //     </div>);
     }

    return (
        <div style={{width : "100%"}}>
            <button onClick={() =>{setCardView(true)}}>Card View</button>
            <button onClick={() => {setCardView(false)}}>Table View</button>
              {cardView && attendanceCardDisplay()}
              {!cardView && attendanceTableDisplay()}
        </div>
    );
}

export default AttendancePage 

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
