import axios from 'axios';
import React, { useEffect, useState , useContext } from 'react';
import { Context } from "../../context/Context";

const End = ({ results, data, onAnswersCheck, time }) => {
  const [user , dispatch] = useContext(Context)
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [marks , setMarks] =useState(0);
  const [maxMarks , setMaxMarks] = useState(0);

  useEffect(async() => {
    let correct = 0;
    let mark=0;
    let mMark=0;
    results.forEach((result, index) => {
      if(result.a === data[index].correct_ans) {
        correct++;
        mark = mark + data[index].marks;
      }
    });

    data.question.map((ele) =>{
        mMark += ele.marks;
    });
    setCorrectAnswers(correct);
    setMarks(mark);
    setMaxMarks(maxMarks);

    const response1 = await axios.post("/quiz/" , {
        userId : user._id,
        ans: results,
        marks : marks,
    });
  }, [setMarks]);

  return(
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h3>Your results</h3>
          <p>{correctAnswers} of {data.length}</p>
          <p><strong>Your Score : {marks} out of {maxMarks}</strong></p>
          <p><strong>Accuracy : {Math.floor((correctAnswers / data.length) * 100)}%</strong></p>
          <p><strong>Time Taken :</strong> {time}</p>
          <button className="button is-info mr-2" onClick={onAnswersCheck}>Check your answers</button>
        </div>
      </div>
    </div>
  );
}

export default End;