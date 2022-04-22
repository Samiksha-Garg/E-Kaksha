import { useState, useContext} from "react";
import { Context } from "../../context/Context";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Sample from "../../PdfView/Sample";
import styles from "../assign.module.css"
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
function MaterialElement(props){

  const {user} = useContext(Context);
  const [modal, setModal] = useState(false)
  
  const openPDF = () => {
    setModal(true);
  }
  let issue = new Date(props.issue);
 
  return (
    <div
    style={{
      backgroundColor: "slategrey",
      padding: "25px 25px",
      margin: "20px 50px",
    }}
  >
    <Dialog
            PaperProps={{
              style: {
                overflow: "visible",
              },
            }}
            onClose={() => {
              setModal(false)
            }}
            open={modal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
 
            <DialogTitle id="alert-dialog-title">
            <div>
        <IconButton
          aria-label="close"
          onClick={() => setModal(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        
    </div>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Sample file = {props.file}/>
              </DialogContentText>
            </DialogContent>
          </Dialog>
    <div>
    </div>
    <div style={{display:"flex", justifyContent : "space-between", alignItems : "center"}}>
        <div>
        <p>Description : {props.desc}</p>
        <p>Issue Date : {issue.toString()}</p>
        </div>
      <div
        style={{
          width: "150px",
          textAlign: "center",
          backgroundColor: "white",
          padding: "5px",
          float: "right",
        }}
      >

    <btn className={styles.btnn} onClick = {openPDF}>View Material</btn>
</div>
      
          
    </div>
  </div>
 );

}

export default MaterialElement;