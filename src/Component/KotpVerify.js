import OTPInput, { ResendOTP } from "otp-input-react";
import { useState } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles(theme => ({
  grid: {
    backgroundColor: "grey",
    height: "50vh",
    textAlign: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  resend: {
    margin: theme.spacing(3, 0, 2)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
})); 


function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [code, setcode] = useState('');
  const [phone,setphone] = useState('')
  const [password,setpassword] = useState('');
  const { id } = useHistory
  let history = useHistory();

  

  const postData = (e) => {
    e.preventDefault()
    let item = {
      phone :localStorage.getItem('phone',phone),
      code: code
    }
    console.log(item)
    
    axios.post("http://localhost:6544/verify", item).then((res) => {
      console.log("updare", res)
      if (res.data.success === true) {
        localStorage.setItem('token', res.data.token);
        window.location.reload(true)
        // history.push('/User')
      }
    })
  }

  const postdata =(e)=>{
    e.preventDefault()
    let item = {
      phone : localStorage.getItem('phone',phone),
      code : code
      // password : localStorage.getItem('password',password)
    }
    console.log("hey item",item)

    axios.post('http://localhost:6544/resend',item).then((res)=>{
      console.log('heyyyy',res)
      if(res.data.success === true){
        localStorage.setItem('token',res.data.token)
        window.location.reload(true)
      }
    })
  }

  return (
    <div>
     
      <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid
          container
          style={{ backgroundColor: "white" }}
          className={classes.grid}
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item container justify="center">
            <Grid item container alignItems="center" direction="column">
              <Grid item>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
              </Grid>
              <Grid item>
                <Typography component="h1" variant="h5">
                  Verification Code
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Paper elevation={0}>
              <Typography variant="h6">
                Please enter the verification code sent to your mobile
              </Typography>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Grid item spacing={3} justify="center">
              <OTPInput
              name='code'
              value={code}
              onChange={setcode}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
                separator={
                  <span>
                    <strong>.</strong>
                  </span>
                }
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  margin: "0 1rem",
                  fontSize: "2rem",
                  borderRadius: 4,
                  border: "1px solid rgba(0,0,0,0.3)"
                }}
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={postData}
              >
                Submit otp
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.resend}
                onClick={postdata}
              >
               Resend otp
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
    </div>
  );
}

export default App