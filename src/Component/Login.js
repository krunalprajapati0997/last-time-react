/* eslint-disable default-case */
/* eslint-disable no-undef */
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import React, { useEffect, useState } from 'react'
import { Grid, Paper, TextField } from '@material-ui/core'
import { Button, Figure } from 'react-bootstrap'
import { useParams, useHistory, Link } from "react-router-dom"
import axios from 'axios'
import { omit } from 'lodash'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import { IconButton, InputAdornment } from '@material-ui/core'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import Swal from 'sweetalert2'

const clientId =
    '602114305766-248o0bv932jisp4kl14ai3hrek33h5o3.apps.googleusercontent.com';

const Login = () => {
    const [email, setEmail] = useState('');
    const [phone,setphone]= useState('');
    // const [password, setPassword] = useState('');
    const [password, setpassword] = useState(false)
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({});
    

    const { id } = useParams()
    let history = useHistory();
    useEffect(() => {
        localStorage.removeItem("token");
    }, [])

    const postData = (e) => {
        e.preventDefault()

        if(values.email === undefined || values.password === undefined ){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Please Enter Email And Password</a>'
              })
        }else{

            let item = {
                email: values.email,
                password: values.password
            }
            console.log(item)
            
            axios.post("http://localhost:6544/login", item).then((res) => {
                localStorage.setItem('token', res.data.token);
                if (res.data.success === true) {
                    
                    Swal.fire(
                        'Login Succesfully',
                        'You clicked the button!',
                        'success'
                        ) 
                        setTimeout(() => {
                        window.location.reload(true)
                           
                          }, 2000);
                        // history.push('/User')
                    }
                   
                })
            }
    }
            

    const validate = (event, name, value) => {
        //A function to validate each input values

        switch (name) {
            case 'password':
                if (!new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/).test(value)) {
                    // we will set the error state

                    setErrors({
                        ...errors,
                        password: 'passwordatleast have 10 to 15  digits'
                    })
                } else {
                    // set the error state empty or remove the error for username input

                    //omit function removes/omits the value from given object and returns a new object
                    let newObj = omit(errors, "password");
                    setErrors(newObj);

                }
                break;

            case 'email':
                if (
                    !new RegExp(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        email: 'Enter a valid email address just like xyz2@gmail.com'
                    })
                } else {

                    let newObj = omit(errors, "email");
                    setErrors(newObj);

                }
                break;
        }
    }
    const handleonclick = () => {
        setpassword(!password)
    }
    const handleonmousedown = () => {
        setpassword(!password)
    }

    function chandle() {
        history.push('/otp')
    }

    function khandle() {
        history.push('/')
    }

    const handleChange = (event) => {
        //To stop default events    
        event.persist();
        let name = event.target.name;
        let val = event.target.value;

        validate(event, name, val);
        setValues({
            ...values,
            [name]: val, [email]: val, [phone]:val, [password]: val
        })
    }

    // const responseGoogle = (response) => {
    //     console.log(response);
    // }

    const googleData = async googleData => {
        let response = {
            token: googleData.tokenId
        }
        axios.post("http://localhost:6544/google", response).then((res) => {
            localStorage.setItem('token', res.data.token);
            if (res.data.success === true) {
                window.location.reload(true)
                // history.push('/Table')
            }
            // console.log("updare", res)
        })


    }
   



    const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' }
    const marginTop = { marginTop: 5 }


    return (
        <div>

            <Grid>
                <Paper elevation={20} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>


                            <LockOutlinedIcon />
                        </Avatar>
                        <h2> Login Page</h2>
                    </Grid>
                    <form>
                        <div>

                            <h6>Loging With phone </h6>

                            <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    name="inlineRadioOptions"

                                    value={1}
                                    checked
                                    onClick={(e) => chandle(e.target.value)}
                                />
                                <label class="form-check-label" for="phone">Phone</label>
                            </div>

                            <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    name="inlineRadioOptions"
                                    value={2}
                                    onClick={(e) => khandle(e.target.value)}
                                />
                                <label class="form-email-label" for="email">Email</label>
                            </div>
                        </div>
                        {/* <TextField name='username' fullWidth label='UserName' value={values.username} onChange={handleChange} error={Boolean(errors.username)} helperText={errors.username} /> */}
                        <TextField name='email' fullWidth label='Email' value={values.email} onChange={handleChange} error={Boolean(errors.email)} helperText={errors.email}

                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>

                                        <MailOutlineIcon />
                                    </InputAdornment>
                                )
                            }} />
                        {/* <TextField name='phone' fullWidth label='Phone' value={values.phone} onChange={handleChange} error={Boolean(errors.phone)} helperText={errors.phone}

                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>

                                        <MailOutlineIcon />
                                    </InputAdornment>
                                )
                            }} /> */}
                        <TextField name='password' fullWidth label='Passwrord' type={password ? 'text' : 'password'} value={values.password} onChange={handleChange} error={Boolean(errors.password)} helperText={errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton

                                            onClick={handleonclick}
                                            onMouseDown={handleonmousedown}
                                        >
                                            {password ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} />
                        <br />

                        <br />
                        <Grid align='center'>


                            <Button type='submit' class='btn btn-info' onClick={postData}>Login </Button>
                            <br />
                            <br />
                            <div>
                               
                                <GoogleLogin
                                    clientId={clientId}
                                    buttonText="Login"
                                    onSuccess={googleData}
                                    onFailure={googleData}
                                    cookiePolicy={'single_host_origin'}
                                    
                                />
                            </div>
                            <div>
                                {/* <GoogleLogout
                                    clientId="909333294270-7rl7blhp6a051hdp7nfj95am8lc4ur1t.apps.googleusercontent.com"
                                    buttonText="Logout"
                                    onLogoutSuccess={logout}
                                >
                                </GoogleLogout> */}
                            </div>

                            {/* <Stack spacing={2} sx={{ width: '100%' }}>
                                <Button variant="outlined" onClick={handleClick}>
                                 
                                   Submit
                                </Button>
                                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                        User Login Succsfully
                                    </Alert>
                                </Snackbar>
                            </Stack> */}
                        </Grid>
                        <br />
                        <Grid>
                            <Link to='/Register'> New Register   </Link>
                            <br />
                            <br />
                            <Link to='/forget'>Forgate Password</Link>

                        </Grid>
                    </form>
                </Paper>

            </Grid>
        </div>
    )
}

export default Login