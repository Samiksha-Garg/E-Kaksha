import axios from 'axios';
import React , {useState , useEffect , useContext} from 'react';
import { Context } from "../../context/Context";

function Start({onQuizStart , title , duration , desc , courseId}){
    const [user , dispatch] = useContext(Context);
    const [courseName , setCourseName] = useState("");
    useEffect(async () =>{
        const response1 = await axios.get("/courseName/" + courseId);
        setCourseName(response1.data.name);
    } , [user])
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
                    
                    <button className="button is-info is-medium" onClick={onQuizStart}>Start</button>
                </div>
            </div>
        </div>
    );
}

export default Start;