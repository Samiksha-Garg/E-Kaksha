import TextField from '@mui/material/TextField';
import { useEffect, useState} from "react";
import styles from "../../styles/SignUp.module.css"
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';

function QuesDialog(props) {

    const [ques, setQues] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [correctOption, setOption] = useState('1');
    const [marks, setMarks] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleMarksChange = (e) => {
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
    
        if (e.target.value != '0' && (e.target.value === '' || re.test(e.target.value))) {
          setMarks(e.target.value)
        }
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
          submitForm();
        } else {
          setIsSubmitting(false);
        }
      }, [formErrors]);
    
      const checkFunc = (event) => {
        setFormErrors(validate());
        setIsSubmitting(true);
      }
    
      const validate = () => {
        let errors = {};
  
        if (!ques) {
          errors.ques = "Question Can't be empty";
        }
    
        if (!option1 || !option2 || !option3 || !option4) {
          errors.option = "Option can't be empty";
        }
  
        if (!marks) {
          errors.marks = "Marks Can't be empty";
        } 
        return errors;
      };

      const submitForm = () => {
        const doc = {
            question : ques,
            option1 : option1,
            option2 : option2,
            option3 : option3,
            option4 : option4,
            correctOption : correctOption,
            marks : marks,
        }
        props.addQues((prev) => {
            return [...prev, doc]
        });
        props.closeModal(false);
      }

    return <div style={{padding : "1% 5% 5% 5%"}}>
        <center>
            <TextField fullWidth id="title" label="Question" variant="standard" value={ques} onChange={(e) => {setQues(e.target.value)}} multiline rows='2'/>
            {formErrors.ques && (
            <center><span className={styles.error}>{formErrors.ques}</span></center>
      )}
            <TextField id="title" label="Marks" variant="standard" value={marks} onChange={handleMarksChange}/>
            {formErrors.marks && (
            <center><span className={styles.error}>{formErrors.marks}</span></center>
      )}
            <center>
                <div style={{width : "40%"}}>
                <TextField fullWidth id="title" label="Option 1" variant="standard" value={option1} onChange={(e) => {setOption1(e.target.value)}} />
                <TextField fullWidth id="title" label="Option 2" variant="standard" value={option2} onChange={(e) => {setOption2(e.target.value)}} />
                <TextField fullWidth id="title" label="Option 3" variant="standard" value={option3} onChange={(e) => {setOption3(e.target.value)}} />
                <TextField fullWidth id="title" label="Option 4" variant="standard" value={option4} onChange={(e) => {setOption4(e.target.value)}} />
                <br></br>
                {formErrors.option && (
            <center><span className={styles.error}>{formErrors.option}</span></center>
      )}
                </div>
            </center>
            <br></br>
            <br></br>
            <div className={styles.profession}>
       <RadioGroup
       row
        aria-labelledby="demo-form-control-label-placement"
        name="position"
        value = {correctOption}
        onChange = {(e) => setOption(e.target.value)}
      >
         
        <FormControlLabel value="1" control={<Radio />} label="Option 1" />
        <FormControlLabel value="2" control={<Radio />} label="Option 2" />
        <FormControlLabel value="3" control={<Radio />} label="Option 3" />
        <FormControlLabel value="4" control={<Radio />} label="Option 4" />
      </RadioGroup>
      </div>

      <Button 
              onClick={checkFunc}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{color : 'white'}}
        >
              ADD
        </Button>

      </center>
    </div>

}

export default QuesDialog;