import React , {useState , useEffect, useContext }from 'react';
import Start from "./Start";
import Question from './Question';
import End from './End';
import Modal from './Modal';
import './Display.css';
import axios from "axios";
import { Context } from "../../context/Context";

let interval;

function Display(props){
    const {user} =useContext(Context)
    const [step ,setStep] = useState(1);
    const [activeQuestion , setActiveQuestion] = useState(0);
    const [answers , setAnswers] = useState([]);
    const [quizData , setQuizData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [time, setTime] = useState(-1);
    const [timer , setTimer] = useState(-1);

    useEffect(async() =>{
        let ans=[];
        const response1 = await axios.get("/quiz/"+props.quizId);
        setQuizData(response1.data);
        let temp = response1.data;
        
        for (let i=0 ; i<temp.question.length ; i++){
            ans.push({
                a: "",
            })
        }
        setAnswers(ans);
    } , [user])

    
    useEffect(() => {
      if (step == 2) {
        let rn = new Date();
        let time = new Date(quizData.date);
        time.setMinutes(time.getMinutes() + parseInt(quizData.duration));
        let diff = (time.getTime() - rn.getTime());
        diff /= 1000 * 60;
        setTimer(60 * Math.ceil(diff));
      }
        if(step === 3) {
          clearInterval(interval);
        }
      }, [step]);

    const goBack = () => {
      props.setModal(false);
    }

    const quizStartHandler = () => {
        setStep(2);
        interval = setInterval(() => {
          setTime(prevTime => prevTime + 1);
          setTimer(prevTime => prevTime-1);
        }, 1000);
    }

    useEffect(() => {
      if(timer === 0 ){
          setStep(3);
      }
    },[timer])
        

    return (
        <div className="App">
          {step === 1 && <Start goBack={goBack} title={quizData.title} desc={quizData.desc} duration={quizData.duration} courseId={quizData.courseId} onQuizStart={quizStartHandler} />}
          {step === 2 && <Question 
            data={quizData.question[activeQuestion]}
            answers = {answers}
            onAnswerUpdate={setAnswers}
            numberOfQuestions={quizData.question.length}
            activeQuestion={activeQuestion}
            onSetActiveQuestion={setActiveQuestion}
            onSetStep={setStep}
            timer = {timer}
          />}
          {step === 3 && <End 
          isNew={true}
          goBack ={props.handleUpdate}
          update = {props.update}
          quizId = {props.quizId}
        results={answers}
        data={quizData.question}
        onAnswersCheck={() => setShowModal(true)}
        time={time}
      />}

      {showModal && <Modal 
        onClose={() => setShowModal(false)}
        onOpen={() => setShowModal(true) }
        results={answers}
        data={quizData.question}
      />}
    </div>
  );
}

export default Display;



