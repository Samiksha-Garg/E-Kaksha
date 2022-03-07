import React from "react";
import styles from "../../styles/SignUp.module.css"
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function SignUpTitle({ setShowModal, title }) {
    return <div className={styles.container}>
        <center>{title}</center>
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