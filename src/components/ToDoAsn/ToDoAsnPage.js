import axios from "axios";
import React, {useEffect, useState, useContext , useCallback} from "react";
import { Context } from "../../context/Context";
import DisplayTasks1 from "./DisplayTasks"

function ToDoAsnPage(){

    const {user , dispatch} =useContext(Context)
    const [courses , setCourses] =useState([]);
    const [assignments , setAssignments] = useState([]);
    const [todoAssignments , setTodoAssignments] = useState([]);
    const [missedAssignments , setMissedAssignments] = useState([]);
    const [completedAssignments , setCompletedAssignments] =useState([]);
    const [quizzes , setQuizzes] = useState([]);
    const [todoQuizzes , setTodoQuizzes] = useState([]);
    const [missedQuizzes , setMissedQuizzes] = useState([]);
    const [completedQuizzes , setCompletedQuizzes] =useState([]);

    useEffect(async () =>{
        let courseArray =user.courses;
        let courseNameArray =[];
        let assignmentArray =[];
        let quizArray =[];
        let todoAsn = [];
        let missedAsn = [];
        let completedAsn = [];
        let todoq = [];
        let missedq = [];
        let completedq = [];
        //let statusArray = [];
        let assigArrayOfCourse=[];
        let quizArrayOfCourse=[];
        let l = courseArray.length;
        let response1 , response2 , response3;
        let courseName;
        let len;

        for(let i=0 ; i<l ; i++){
            response1 = await axios.get("/course/courseName/" + courseArray[i]);
            response2 = await axios.get("/assignment/courseid/" + courseArray[i]);
            response3 = await axios.get("/quiz/courseid/" + courseArray[i]);
            courseName=response1.data.name;
            courseNameArray.push({
                cid : courseArray[i],
                name: courseName,
            });
        

            assigArrayOfCourse = response2.data;
            //console.log(assigArrayOfCourse);
             
            len=assigArrayOfCourse.length;
            for(let j=0; j<len ; j++){
                assignmentArray.push({
                    cid: courseArray[i],
                    course : courseName,
                    assigid: assigArrayOfCourse[j]._id,
                    title:assigArrayOfCourse[j].title,
                    start:new Date(assigArrayOfCourse[j].issueDate),
                    deadline: new Date(assigArrayOfCourse[j].deadline),
                    submissions: assigArrayOfCourse[j].submissions,
                    type : "assignment"
                });
            }
            
            quizArrayOfCourse = response3.data;
            //console.log(quizArrayOfCourse);
            len=quizArrayOfCourse.length;
            for(let j=0 ; j<len ; j++){
                quizArray.push({
                    cid : courseArray[i],
                    course : courseName,
                    quizid: quizArrayOfCourse[j]._id,
                    title: quizArrayOfCourse[j].title,
                    start: new Date(quizArrayOfCourse[j].date),
                    deadline: quizArrayOfCourse[j].duration,
                    submissions: quizArrayOfCourse[j].submissions,
                    type : "quiz"
                });
            }
        }
      
        setCourses(courseNameArray);
        setAssignments(assignmentArray);
        setQuizzes(quizArray);



        let IdOfUser =user.__id;
        l = assignmentArray.length;
        for(let i=0 ; i<l ; i++){
            let len =assignmentArray[i].submissions.length;
            let flag=1;
            for(let j=0 ; j<len ; j++){
                if(IdOfUser === assignmentArray[i].submissions[j].studentId){
                    flag=0;break;
                }
            }

            if(flag){
                let today = new Date();
                let deadline = assignmentArray[i].deadline;
                

                if(today.getTime() > deadline.getTime()){
                    missedAsn.push(assignmentArray[i]);
                }else {
                    todoAsn.push(assignmentArray[i]);
                }
            }else{
                completedAsn.push(assignmentArray[i]);
            }
        }
        setTodoAssignments(todoAsn);
        setCompletedAssignments(completedAsn);
        setMissedAssignments(missedAsn);

        l = quizArray.length;
        //console.log("length" , l);
        for(let i=0 ; i<l ; i++){
            let len =quizArray[i].submissions.length;
            let flag=1;
            for(let j=0 ; j<len ; j++){
                if(IdOfUser === quizArray[i].submissions[j].studentId){
                    flag=0;break;
                }
            }

            if(flag){
                let today = new Date();
                let deadline =quizArray[i].start;
                if(today.getTime() > deadline.getTime()){
                  
                    //console.log(today , deadline);
                    missedq.push(quizArray[i]);
                }else {
                    todoq.push(quizArray[i]);
                }
            }else{
                completedq.push(quizArray[i]);
            }
        }
        setTodoQuizzes(todoq);
        setCompletedQuizzes(completedq);
        setMissedQuizzes(missedq);

    } ,[user])

    return (
        <div style={{width : "100%"}}>
            <DisplayTasks1 todoAssignments={todoAssignments} missedAssignments={missedAssignments} 
            completedAssignments={completedAssignments} todoQuizzes={todoQuizzes} 
            missedQuizzes={missedQuizzes} completedQuizzes={completedQuizzes}
            courses = {courses}/>
        </div>
    );
}



export default ToDoAsnPage;
