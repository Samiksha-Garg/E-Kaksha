import axios from 'axios';
import React , {useState , useEffect} from 'react';

function Start({goBack, onQuizStart , title , duration , desc , courseId}){
    const [courseName , setCourseName] = useState("");
    useEffect(async () =>{
        if (courseId != undefined) {
            const response1 = await axios.get("/course/courseName/" + courseId);
            setCourseName(response1.data.name);
        }
        
    } , courseId)
    return (
        <div className = "card">
            <div className="card-content">
                <div className="content">
                    <p>Course Name : {courseName}</p>
                    <p>Title : {title}</p>
                    <p>Description : {desc}</p>
                    <p>Duration : {duration}</p>
                    <h1>Start The Quiz</h1>
                    <p>Good Luck</p>
                    <div style={{display : "flex", justifyContent : "space-between"}}>
                    <button className="button is-info is-medium" onClick={onQuizStart}>Start</button>
                    <button className="button is-info is-medium" onClick={goBack}>Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Start;