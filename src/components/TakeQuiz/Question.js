import React, { useState, useEffect, useRef } from 'react';

const Question = ({ data, onAnswerUpdate, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep , timer }) => {
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const radiosWrapper = useRef();

  useEffect(() => {
    const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
    if(findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, [data]);

  const changeHandler = (e) => {
    setSelected(e.target.value);
    if(error) {
      setError('');
    }
  }
  
  const nextClickHandler = (e) => {
    onAnswerUpdate(prevState => [...prevState, prevState[activeQuestion].a =selected]);
    setSelected('');
    if(activeQuestion < numberOfQuestions - 1) {
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
    setSelected('');
    onSetActiveQuestion(activeQuestion -1);
  }

  return(
    <div className="card">
      <div className="card-content">
        <div className="content">
        Time Left : <h3 className="mb-5">{timer}</h3> In Seconds !
        <hr></hr>
          <h2 className="mb-5">{data.desc}</h2>
          <div className="control" ref={radiosWrapper}>
            {data.options.map((option, i) => (
              <label className="radio has-background-light" key={i}>
                <input type="radio" name="answer" value={option} onChange={changeHandler} />
                {option}
              </label>
            ))}
          </div>
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