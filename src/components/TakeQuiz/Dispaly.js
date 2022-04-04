import React , {useState , useEffect, useContext }from 'react';
import Start from "./Start";
import Question from './Question';
import End from './End';
import Modal from './Modal';
import './Display.css';
import axios from "axios";
import { Context } from "../../context/Context";

let interval;

function Display({props}){
    const {user , dispatch} =useContext(Context)
    const [step ,setStep] = useState(1);
    const [activeQuestion , setActiveQuestion] = useState(0);
    const [answers , setAnswers] = useState([]);
    const [quizData , setQuizData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [time, setTime] = useState(0);
    const [timer , setTimer] = useState(0);

    useEffect(async() =>{
        let ans=[];
        const response1 = await axios.get("/quiz/"+"6249ca540072b4b1dad67cc4");
        setQuizData(response1.data);
        let temp = response1.data;
        setTimer(temp.duration*3600);
        
        for (let i=0 ; i<temp.question.length ; i++){
            ans.push({
                q: temp.question[i].question ,
                a: "",
            })
        }
        setAnswers(ans);
    } , [user])
    
    useEffect(() => {
        if(step === 3) {
          clearInterval(interval);
        }
      }, [step]);

    const quizStartHandler = () => {
        setStep(2);
        interval = setInterval(() => {
          setTime(prevTime => prevTime + 1);
          setTimer(prevTime => prevTime-1);
            if(timer === 0 ){
                setStep(3);
            }
        }, 1000);
    }
        

    return (
        <div className="App">
          {step === 1 && <Start title={quizData.title} desc={quizData.desc} duration={quizData.duration} courseId={quizData.courseId} onQuizStart={quizStartHandler} />}
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



