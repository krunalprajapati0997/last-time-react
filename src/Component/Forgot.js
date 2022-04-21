/* eslint-disable default-case */
import React, { useState, } from 'react'
import { Grid, Paper, TextField } from '@material-ui/core'
import { Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { omit } from 'lodash'
import Swal from 'sweetalert2'

function Forgot() {
    const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({});
    let history = useHistory();

    const postData = (e) => {
        e.preventdefault()
        if (values.email === undefined || values.password === undefined) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Please Enter Email And Password</a>'
            })
        } else {

            let FD = new FormData();
           
            FD.append('email', values.email)
            
            FD.append("password", values.password)
            console.log(FD)

            axios.put(`http://localhost:6544/forget`, FD).then((res) => {

                // history.push('/')
            })
                Swal.fire(
                    'User Passwor Forgot Succesfully',
                    'You clicked the button!',
                    'success'
                    ) 
                    setTimeout(() => {
                        window.location.reload(true)
                        
                    }, 2000);
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

    const handleChange = (event) => {
        //To stop default events    
        event.persist();
        let name = event.target.name;
        let val = event.target.value;

        validate(event, name, val);
        setValues({
            ...values,
            [name]: val, [email]: val, [password]: val
        })
    }

    return (
        <div>
            <div>

                <Grid>
                    <Paper elevation={20} style={paperStyle}>
                        <Grid align='center'>
                            <h2> Forget Password</h2>
                        </Grid>
                        <form>
                            <TextField name='email' fullWidth label='Email' value={values.email} onChange={handleChange} error={Boolean(errors.email)} helperText={errors.email} />
                            <TextField name='password' fullWidth label='Passwrord' value={values.password} onChange={handleChange} error={Boolean(errors.password)} helperText={errors.password} />
                            <br />
                            <br />

                            <Grid align='center'>
                                <Button type='submit' variant="info" onClick={postData} ><Link to='/'> Submit</Link></Button>

                            </Grid>
                            <br />

                        </form>
                    </Paper>
                </Grid>
            </div>
        </div>
    )
}

export default Forgot