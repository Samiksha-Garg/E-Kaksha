import React, { useState, useEffect, useRef } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

const Question = ({ data, answers, onAnswerUpdate, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep , timer }) => {
  const [selected, setSelected] = useState(answers[activeQuestion].a);
  const [error, setError] = useState('');
  const [options, setOptions] = useState([]);
  const radiosWrapper = useRef();

  useEffect(() => {
    let op = [data.option1, data.option2, data.option3, data.option4];
    setOptions(op);

    // const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
    // if(findCheckedInput) {
    //   findCheckedInput.checked = false;
    // }
  }, [data]);

  const changeHandler = (e) => {
    setSelected(e.target.value);
    if(error) {
      setError('');
    }
  }
  
  const nextClickHandler = (e) => {
    // console.log(answers);
    let temp = answers;
    answers[activeQuestion].a = selected;
    onAnswerUpdate(temp);
    
    if(activeQuestion < numberOfQuestions - 1) {
      console.log(answers[activeQuestion + 1].a);
      setSelected(answers[activeQuestion + 1].a);
      onSetActiveQuestion(activeQuestion + 1);
    }else {
      onSetStep(3);
    }
  }

  const prevClickHandler = (e) => {
    if(activeQuestion === 0){
        return setError("Can Not Move Back");
    }
    onAnswerUpdate(prevState => [...prevState, prevState[activeQuestion].a =selected]);
    setSelected(answers[activeQuestion - 1].a);
    onSetActiveQuestion(activeQuestion -1);
    
  }

  return(
    <div className="card">
      <div className="card-content">
        <div className="content">
        Time Left : <h3 className="mb-5">{timer}</h3> In Seconds !
        <hr></hr>
          <h2 className="mb-5">{data.question}</h2>
          <RadioGroup
        aria-labelledby="demo-form-control-label-placement"
        name="position"
            value = {selected}
         onChange = {(e) => setSelected(e.target.value)}
          >
            {options.map((option, i) => (
              <FormControlLabel value={i + 1} control={<Radio />} label={option} />
              // <label className="radio has-background-light" key={i}>
              //   <input type="radio" name="answer" value={i + 1} onChange={changeHandler} />
              //   {option}
              // </label>
            ))}
          </RadioGroup>
          {error && <div className="has-text-danger">{error}</div>}
          <button className="button is-link is-medium is-fullwidth mt-4" onClick={prevClickHandler}>Previous</button>
          <button className="button is-link is-medium is-fullwidth mt-4" onClick={nextClickHandler}>{activeQuestion===numberOfQuestions-1 ? "SUBMIT" : "NEXT"}</button>
        </div>
      </div>
    </div>
  );
}

export default Question;

//{ q: data.question, a: selected }
