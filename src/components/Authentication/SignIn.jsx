import logo from "../../assets/logo.png"
import styles from "../../styles/SignIn.module.css"
import React, {useState, useRef, useContext} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import SignUpTitle from "./signUpTitle";
import SignUp from "./SignUp";
import Google from "../../assets/google.png";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Context} from "../../context/Context";

toast.configure()


const theme = createTheme({
  palette: {
    primary: {
      main: '#607782',
    },
    secondary : {
      main : '#F3BD40'
    }
  },
});



export default function SignIn() {

  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const intialValues = { email: "", password: ""};
  const [formValues, setFormValues] = useState(intialValues);
  const [authError, setAuthError] = useState("");
  const [modalStatus, setModalStatus] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const userRef= useRef();
  const passwordRef=useRef();
  const {dispatch,isFetching}=useContext(Context);

  const notify = ()=>{
 
    // Calling toast method by passing string
    toast.success('Log In Successfull',  {position: toast.POSITION.BOTTOM_CENTER})
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    
  };
 
  const handleLogIn = async (event) => {

    if (showModal) {
      return;
    }
    
    event.preventDefault();
    dispatch({ type: "LOGIN_START" });
    setIsSubmitting(true);

    try {

    const response = await axios.post("/auth/login", {
      email : formValues.email,
      password : formValues.password,
    });

    if (response.status != 200) {
      console.log(response);
      throw new Error(`Error! status: ${response.status}`);
    }
    dispatch({type:"LOGIN_SUCCESS", payload:response.data});
    const user = await response.data;
    console.log(user);
    notify();
    setFormValues(intialValues);
  } catch (err) {
    dispatch({type:"LOGIN_FAILURE"})
    console.log(err.response.data);
    setAuthError(err.response.data);
    setModalStatus(true);
  }
    setIsSubmitting(false);
  };
  
 
  const handleClose = () => {
    setModalStatus(false);
  };
  


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
      <Dialog
            PaperProps={{
              style: {
                overflow: "visible",
              },
            }}
            open={isSubmitting}
            
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <CircularProgress/>
              
              </DialogContentText>
            </DialogContent>
          </Dialog>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
        >
         <img src={logo} className={styles.logo}></img>

        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#F3BD40' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" Validate onSubmit={handleLogIn} sx={{ mt: 1 }}>
              <TextField
              // value={formValues.email}
              value={formValues.email}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                ref={userRef}
                autoFocus
                // error={formErrors.email}
                onChange={handleChange}
              />
              {/* {formErrors.email && (
            <span className={styles.error}>{formErrors.email}</span>
            )} */}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formValues.password}
                // error={formErrors.password}
                onChange={handleChange}
                autoComplete="off"
                ref={passwordRef}
              />
               {/* {formErrors.password && (
            <span className={styles.error}>{formErrors.password}</span>
          )} */}
          
              <FormControlLabel
                control={<Checkbox checked={isChecked} onChange={() => setChecked(!isChecked)} color="primary" />}
                label="Remember me"
              />

              <Button
              color="secondary"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{color : 'white'}}
                
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link variant="body2" className={styles.links} onClick={() => {
                    setShowModal(true);
                    setFormValues(intialValues);
                  }}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                  <Dialog
            PaperProps={{
              style: {
                overflow: "visible",
              },
            }}
            open={showModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
 
            <DialogTitle id="alert-dialog-title"><SignUpTitle title="Sign Up" setShowModal={setShowModal}/></DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <SignUp setShowModal={setShowModal}></SignUp>
              </DialogContentText>
            </DialogContent>
          </Dialog>
                </Grid>
              </Grid>
              <hr style={{marginTop : "20px"}}></hr>
             
            </Box>
            <center>
                <p>OR LOG IN WITH</p>
                <button className={styles.google}>
                  <img src={Google} alt="" width={50} />
                </button>
              </center>
          </Box>
          <Dialog
            PaperProps={{
              style: {
                overflow: "visible",
              },
            }}
            onClose={handleClose}
            open={modalStatus}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
 
            <DialogTitle id="alert-dialog-title">
            <div>
        <center>Error</center>
        <IconButton
          aria-label="close"
          onClick={() => setModalStatus(false)}
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
                <div className={styles.error}>{authError}</div>
              </DialogContentText>
            </DialogContent>
          </Dialog>
         
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
