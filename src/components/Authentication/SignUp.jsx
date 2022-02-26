import React, {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import styles from "../../styles/SignUp.module.css";
import DatePicker from '@mui/lab/DatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Google from "../../assets/google.png"
import CircularProgress from '@mui/material/CircularProgress';
import { toDate } from 'date-fns/esm';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

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

export default function SignUp() {


const [selectedProf, setSelectedProf] = useState('teacher');
const [value, setValue] = useState(null);
const intialValues = { email: "", password: "", confirmPassword:"", firstName:"", lastName:"" };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = () => {
    setIsSubmitting(false);
    console.log(formValues);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      errors.firstName = "First Name Can't be empty"
    }
    
    if (!values.lastName) {
      errors.lastName = "Last Name Can't be empty"
    }
    if (!values.email) {
      errors.email = "Cannot be blank";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.password) {
      errors.password = "Cannot be blank";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters";
    } else if (values.password != values.confirmPassword) {
      errors.confirmPassword = "Password don't match";
    }

    if (!value) {
      errors.dob = "Enter DOB";
    } else {
      const d = new Date();
      if (value > d) {
        errors.dob = "Enter Valid DOB";
      }
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    } else {
      setIsSubmitting(false);
    }
  }, [formErrors]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Dialog
            PaperProps={{
              style: {
                overflow: "visible",
              },
            }}
            open={isSubmitting}
            // onClose={() => setShowModal(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <CircularProgress/>
              
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                 value={formValues.firstName}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={formErrors.firstName}
                  onChange={handleChange}
                />
                {formErrors.firstName && (
            <span className={styles.error}>{formErrors.firstName}</span>
            )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                value={formValues.lastName}
                error={formErrors.lastName}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
                {formErrors.lastName && (
            <span className={styles.error}>{formErrors.lastName}</span>
            )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                value={formValues.email}
                error={formErrors.email}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                {formErrors.email && (
            <span className={styles.error}>{formErrors.email}</span>
            )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                value={formValues.password}
                error={formErrors.password}
                  onChange={handleChange}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                {formErrors.password && (
            <span className={styles.error}>{formErrors.password}</span>
            )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                value={formValues.confirmPassword}
                error={formErrors.confirmPassword}
                  onChange={handleChange}
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
                {formErrors.confirmPassword && (
            <span className={styles.error}>{formErrors.confirmPassword}</span>
            )}
              </Grid>
      <div className={styles.profession}>
      <Grid style={{margin : "10px"}}>
       <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date Of Birth"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <br></br>
       {formErrors.dob && (
            <center><span className={styles.error}>{formErrors.dob}</span></center>
            )}
    </LocalizationProvider>
   
    </Grid>
    </div>
<div className={styles.profession}>
       <RadioGroup
       row
        aria-labelledby="demo-form-control-label-placement"
        name="position"
        value = {selectedProf}
        onChange = {(e) => setSelectedProf(e.target.value)}
      >
         
        <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
        <FormControlLabel value="student" control={<Radio />} label="Student" />
      </RadioGroup>
      </div>
            </Grid>
            <Button
            color="secondary"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{color : 'white'}}
            >
              Create New Account
            </Button>

            <center>
                <p>OR SIGN UP WITH</p>
                <button className={styles.google}>
                  <img src={Google} alt="" width={50} />
                </button>
              </center>
          
          </Box>
      </Container>
    </ThemeProvider>
  );
}
