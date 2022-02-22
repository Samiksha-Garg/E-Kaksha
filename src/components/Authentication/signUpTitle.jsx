import React, {useState } from "react";
import styles from "../../styles/SignUp.module.css"
import { ImCross} from "react-icons/im";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function SignUpTitle({ setShowModal }) {
    return <div className={styles.container}>
        <center>{"Sign Up"}</center>
        <IconButton
          aria-label="close"
          onClick={() => setShowModal(false)}
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
}