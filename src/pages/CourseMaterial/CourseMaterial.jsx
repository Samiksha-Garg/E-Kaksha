import { useEffect, useState, useContext} from "react";
import classes from "../CoursePage.module.css";
import { Context } from "../../context/Context";
import {
    Dialog,
    DialogContent,
    DialogContentText,
  } from "@mui/material";
import ReactFileReader from 'react-file-reader';
import styles from "../../styles/Calendar.module.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import MaterialElement from "./materialElement";

function CourseMaterial(props){

    const {user} = useContext(Context);
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState('');
    const [fileName, setName] = useState('');
    const [file, setFile] = useState(null);
    const [material, setMaterial] = useState(props.material);

    const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    } else {
      setIsSubmitting(false);
    }
  }, [formErrors]);

  useEffect(() => {
    setMaterial(props.material);
  },[props])

  const checkFunc = (event) => {
    setFormErrors(validate());
    setIsSubmitting(true);
  }

  const validate = () => {
    let errors = {};
    
    if (!title) {
      errors.title = "Description Can't be empty"
    }

    if (!file) {
      errors.file = "No File Choosen";
    }

    return errors;
  };


    const handleTitleChange = (e) => {
        const {value } = e.target;
        setTitle(value);
      }

      const handleFiles = async (files) => {
        setName(files.fileList[0].name);
         setFile(files.base64);
      }
    
      const handleClose = () => {
        setModal(false);
        setFile();
        setName('');
        setTitle('');
        setIsSubmitting(false);
        setFormErrors({});
      }

      const submitForm = async() => {
          const doc = {
              courseId : props.cid,
              file : file,
              desc : title
          };
          const response = await axios.post("/material", doc);
          console.log(response);
          props.func(response.data);
          handleClose();
      }

    return <div>
        {material.length == 0 && 
         <center> <p>No Course Mateiral!</p></center>
        } 
        {material.length != 0 && material.map((event) => {
          return <MaterialElement  desc = {event.desc} file = {event.file} issue = {event.createdAt}/>;
        })} 
        {user.role == "teacher" && <div onClick={() => {
          setModal(true);
        }} className={classes.add}>+</div>}
        <Dialog
            PaperProps={{
              style: {
                overflow: "visible",
              },
            }}
            open={modal}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
        
    <DialogContent style={{width : "100%", backgroundColor : "#fcc8bd"}}>
              <DialogContentText id="alert-dialog-description">
                <center>
                  <br/>
                  
                    <div style={{width : "100vw"}}></div>
 
                <br/>
                
    <TextField id="title" label="Description" multiline
          rows={4}  variant="standard" value={title} onChange={handleTitleChange} />
    {formErrors.title && (
            <center><span className={styles.error}>{formErrors.title}</span></center>
            )}
          <br/>
          <br/>
          <ReactFileReader fileTypes={[".pdf"]} base64={true} handleFiles={handleFiles}>
          <button style={{border : "solid 1px"}} className='btn'>Upload PDF</button>
        </ReactFileReader>
        {file && <center><span>{fileName}</span></center>}
        {(<center><span className={styles.error}>{formErrors.file}</span></center>
            )}
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
              </DialogContentText>
            </DialogContent>
            </Dialog>
    </div>
}

export default CourseMaterial;