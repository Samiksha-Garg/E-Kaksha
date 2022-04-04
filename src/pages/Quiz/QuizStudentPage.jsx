import QuizStudentElement from "./quizElementStudent";
import { useEffect, useState, useContext} from "react";
import { Context } from "../../context/Context";

function QuizStudentPage(props) {

    const {user} = useContext(Context);
    const [quiz, setQuiz] = useState([]);

    useEffect(() => {
      setQuiz(props.quiz);
    },[props.quiz])

    return <div>
        {quiz.length == 0 && 
         <center> <p>No Quizzes!</p></center>
        } 
        {quiz.length != 0 && quiz.map((event) => {
          return <QuizStudentElement reload={props.func2} update={props.func} sub={event.submissions} key={event._id} quizId ={event._id} title = {event.title} date = {event.date} desc = {event.desc} duration = {event.duration} question = {event.question}/>;
        })} 
    </div>
}

export default QuizStudentPage;