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
        

            assigArrayOfCourse = response2.data;;
             
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



        let IdOfUser =user._id;
        l = assignmentArray.length;
        for(let i=0 ; i<l ; i++){
            let len =assignmentArray[i].submissions.length;
            let flag=1;
            for(let j=0 ; j<len ; j++){
                if(IdOfUser === assignmentArray[i].submissions[j].student){
                    flag=0;
                    break;
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

/*
 M
            {todoAssignments.map((obj) =>{
                return <CardDisplay cid={obj.cid} course={obj.course} quizid={obj.assigid} title={obj.title} start={obj.start} deadline={obj.deadline} submissions={obj.submissions} type={"asn"} status={0} ></CardDisplay>
            })}
            A
            {completedAssignments.map((obj) =>{
                return <CardDisplay cid={obj.cid} course={obj.course} quizid={obj.assigid} title={obj.title} start={obj.start} deadline={obj.deadline} submissions={obj.submissions} type={"asn"} status={1}></CardDisplay>
            })}
            H
            {missedAssignments.map((obj) =>{
                return <CardDisplay cid={obj.cid} course={obj.course} quizid={obj.assigid} title={obj.title} start={obj.start} deadline={obj.deadline} submissions={obj.submissions} type={"asn"} status={-1}></CardDisplay>
            })}
            A
            {todoQuizzes.map((obj) =>{
                return <CardDisplay cid={obj.cid} course={obj.course} quizid={obj.quizid} title={obj.title} start={obj.date} deadline={obj.duration} submissions={obj.submissions} type={"quiz"} status={0}></CardDisplay>
            })}
            D
            {completedQuizzes.map((obj) =>{
                return <CardDisplay cid={obj.cid} course={obj.course} quizid={obj.quizid} title={obj.title} start={obj.date} deadline={obj.duration} submissions={obj.submissions} type={"quiz"} status={1}></CardDisplay>
            })}
            E
            {missedQuizzes.map((obj) =>{
                return <CardDisplay  cid={obj.cid} course={obj.course} quizid={obj.quizid} title={obj.title} start={obj.date} deadline={obj.duration} submissions={obj.submissions} type={"quiz"} status={-1}></CardDisplay>
            })}
            V
*/
/*
{todoAssignments.map((obj) =>{
                return <CardDisplay  {...obj}></CardDisplay>
            })}
            A
            {completedAssignments.map((obj) =>{
                return <CardDisplay  {...obj}></CardDisplay>
            })}
            H
            {missedAssignments.map((obj) =>{
                return <CardDisplay  {...obj}></CardDisplay>
            })}
*/

/*
<BasicTable statusTasks={statusTasks}/>
<SortingTable statusTasks={statusTasks}/>
*/

/*
<FilteringTable statusTasks={statusTasks}></FilteringTable>
*/

/*
        //console.log(todoAsn);
        //console.log(missedAsn);
        //console.log(completedAsn);
        //console.log("todo" , todoAssignments);
        //console.log("missed" , missedAssignments);
        //console.log("completed" , completedAssignments);

        //console.log(todoq);
       // console.log(missedq);
        //console.log(completedq);
        //console.log("todoq" , todoQuizzes);
        //console.log( "missedq", missedQuizzes);
        //console.log("completedq" , completedQuizzes);

        /*l=todoAssignments.length;
        for(let i=0 ; i<l ; i++){
            statusArray.push({
                "todo" : todoAssignments[i],
                "missed" : "",
                "completed" : "",
            });
        }
        l=missedAssignments.length;
        for(let i=0 ; i<l ; i++){
            statusArray.push({
                "todo" : "",
                "missed" : missedAssignments[i],
                "completed" : "",
            });
        }
        l=completedAssignments.length;
        for(let i=0 ; i<l ; i++){
            statusArray.push({
                "todo" : "",
                "missed" : "",
                "completed" : completedAssignments[i],
            });
        }

        l=todoQuizzes.length;
        for(let i=0 ; i<l ; i++){
            statusArray.push({
                "todo" : todoQuizzes[i],
                "missed" : "",
                "completed" : "",
            });
        }
        l=missedQuizzes.length;
        for(let i=0 ; i<l ; i++){
            statusArray.push({
                "todo":"",
                "missed" : missedQuizzes[i],
                "completed":"",
            });
        }
        l=completedQuizzes.length;
        for(let i=0 ; i<l ; i++){
            statusArray.push({
                "todo" : "",
                "missed" : "",
                "completed" : completedQuizzes[i],
            });
        }

        setStatusTasks(statusArray);*/
        //console.log("status" , statusArray );
        //console.log("status" , statusTasks);
