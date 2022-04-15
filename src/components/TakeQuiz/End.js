import axios from 'axios';
import React, { useEffect, useState , useContext } from 'react';
import { Context } from "../../context/Context";

const End = ({goBack, results, data, onAnswersCheck, time, quizId, update, isNew }) => {
  const {user , dispatch} = useContext(Context)
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [marks , setMarks] =useState(0);
  const [maxMarks , setMaxMarks] = useState(0);
  const [back, setBack] = useState(false);
  useEffect(async() => {
    let correct = 0;
    let mark=0;
    let mMark=0;

    results.forEach((result, index) => {
      if(result.a === data[index].correctOption) {
        correct = correct + 1;
        mark = mark + parseInt(data[index].marks);
      }
    });

    data.map((ele) =>{
        mMark += parseInt(ele.marks);
    });
    setCorrectAnswers(correct);
    setMarks(mark);
    setMaxMarks(mMark);

    if (isNew) {
      const response1 = await axios.put("/quiz/submission/" + quizId , {
        student : user._id,
        result: results,
        marks : mark,
      });
      update(response1.data);
      setBack(true);
    }

  
  }, []);


  return(
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h3>Your results</h3>
          <p>{correctAnswers} of {data.length}</p>
          <p><strong>Your Score : {marks} out of {maxMarks}</strong></p>
          <p><strong>Accuracy : {Math.floor((correctAnswers / data.length) * 100)}%</strong></p>
          {isNew && <p><strong>Time Taken :</strong> {time + " secs"}</p>}
          <button className="button is-info mr-2" onClick={onAnswersCheck}>Check your answers</button>
          <br/>
          <br/>
          {back && <button className="button is-info mr-2" onClick={goBack}>Go Back</button>}
        </div>
      </div>
    </div>
  );
}

export default End;