import React,  {useState , useEffect , useContext} from 'react';

const Modal = ({ onClose, onOpen , results, data}) => {

  return(
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Your answers</p>
          <button className="delete" onClick={onClose}></button>
        </header>
        <section className="modal-card-body content">
          <ul>
            {results.map((result, i) => (
              
              <li key={i} className="mb-6">
                <p><strong>{result.q}</strong></p>
                <p className={result.a === data[i].correctOption ? 'has-background-success has-text-white p-2' : 'has-background-danger has-text-white p-2'}>Your answer: {result.a == '1' ? data[i].option1 : result.a == '2' ? data[i].option2 : result.a == '3' ? data[i].option3 : result.a == '4' ? data[i].option4 : '' }</p>
                {result.a !== data[i].correctOption && <p className="has-background-link has-text-white p-2">Correct answer: {data[i].correctOption == '1' ? data[i].option1 : data[i].correctOption == '2' ? data[i].option2 : data[i].correctOption == '3' ? data[i].option3 : data[i].correctOption == '4' ? data[i].option4 : ''}</p>}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Modal;