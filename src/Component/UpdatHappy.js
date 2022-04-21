

import React, { useState,useEffect  } from 'react'
import { Grid, Paper, TextField } from '@material-ui/core'
import { Button } from 'react-bootstrap'
import { useHistory ,Link } from "react-router-dom"
import axios from 'axios'
import { omit } from 'lodash'
import Alert from '@material-ui/lab/Alert'
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

const Material = () => {

    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [gender, setgender] = useState('');
    const [Age, setAge] = useState('');
    const [address, setaddress] = useState('');
    const {id} = useParams();

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({});

    
    let history = useHistory();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        getuser()


    }, [])

    const getuser = () => {
        console.log("id----------", id)
        let token = localStorage.getItem("token");
        if (id === undefined || id === null) {
        } else {
            axios.get(`http://localhost:7037/${id}`, { headers: { 'x-access-token': token } }).then((result) => {
                console.log("result.data", result)
                setValues({
                    firstname: result.data.user.firstname,
                    lastname: result.data.user.lastname,
                    gender: result.data.user.gender,
                    Age: result.data.user.Age,
                    address: result.data.user.address,
                    
                })
                setfirstname(result.data.user.firstname)
                setlastname(result.data.user.lastname)
                setgender(result.data.user.gender)
                setAge(result.data.user.Age)
                setaddress(result.data.user.address)


            })
        }
    }
    const handleClick = () => {
        let token = localStorage.getItem('token')
        let item = {
            firstname: values.firstname,
            lastname: values.lastname,
            gender: values.gender,
            Age: values.Age,
            address: values.address
        }
        console.log(item)
        axios.put(`http://localhost:6544/happy/${id}`, item,{ headers:{'x-access-token':token}}).then((res) => {
            console.log("update", res.data)
        })
        history.push('/product')
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };



    // const postData = () => {
    //     let FD = new FormData();
    //     FD.append('username', username);
    //     FD.append('phonenumber', phonenumber);
    //     FD.append('email', email);
    //     FD.append('password', password);
    //     axios.post('http://localhost:8000/', FD)
    //     history.push("/")
    // } 
    // function postData() {
    //     let item = {
    //         username: values.username,
    //         email: values.email,
    //         phonenumber: values.phonenumber,
    //         password: values.password
    //     }
    //     console.log(item)
    //     axios.post("http://localhost:7005", item).then((res) => {
    //         console.log("updare", res)
    //     })
    //     history.push('/')
    //     alert('register succefuuly')

    // }


    const validate = (event, name, value) => {


        switch (name) {
            case 'username':
                if (!new RegExp(/([a-zA-Z]{3,20})/).test(value)) {
                    setErrors({
                        ...errors,
                        username: 'Username atleast have 3 letters'
                    })
                } else {
                    let newObj = omit(errors, "username");
                    setErrors(newObj);
                }
                break;
            case 'phonenumber':
                if (!new RegExp(/^((\+)?(\d{2}[-]))?/).test(value)) {
                    setErrors({
                        ...errors,
                        phonenumber: 'Phonenumber atleast have 10'
                    })
                } else {

                    let newObj = omit(errors, "phonenumber");
                    setErrors(newObj);

                }
                break;
            // case 'password':
            //     if (!new RegExp(/^((\+)?(\d{2}[-]))/).test(value)) {
            //         setErrors({
            //             ...errors,
            //             password: 'Password atleast have 8'
            //         })
            //     } else {

            //         let newObj = omit(errors, "password");
            //         setErrors(newObj);

            //     }
            //     break;
            case 'email':
                if (
                    !new RegExp(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        email: 'Enter a valid email address just like mailto:xyz2@gmail.com'
                    })
                } else {

                    let newObj = omit(errors, "email");
                    setErrors(newObj);

                }
                break;
        }
    }

    const handleChange = (event) => {

        event.persist();
        let name = event.target.name;
        let val = event.target.value;

        validate(event, name, val);
        setValues({
            ...values,
            [name]: val,
        })
    }
    const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' }


    return (
        <div>
            <Grid>
                <Paper elevation={20} style={paperStyle}>
                    <Grid align='center'>
                        <h2> Update Form</h2>
                    </Grid>
                    <form>
                        <TextField name='firstname' fullWidth label='Firstname' value={values.firstname} onChange={handleChange} error={Boolean(errors.firstname)} helperText={errors.firstname} />
                        <TextField name='lastname' fullWidth label='Lastname' value={values.lastname} onChange={handleChange} error={Boolean(errors.lastname)} helperText={errors.lastname} />
                        <TextField name='gender' fullWidth label='Gender' value={values.gender} onChange={handleChange} error={Boolean(errors.gender)} helperText={errors.gender} />
                        {/* <TextField name='password' fullWidth label='Passwrord' value={values.password} onChange={handleChange} error={Boolean(errors.password)} helperText={errors.password} /> */}
                         <TextField name='Age' fullWidth label='Age' value={values.Age} onChange={handleChange} error={Boolean(errors.Age)} helperText={errors.Age} />
                        <TextField name='address' fullWidth label='Address' value={values.address} onChange={handleChange} error={Boolean(errors.address)} helperText={errors.address} />
                        <br />
                        <br />
                        {/* <Button type='submit' class='btn btn-info' onClick={postData}>Submit</Button> */}
                        <Stack spacing={2} sx={{ width: '100%' }}>
                            <Button variant="outlined" variant="info" onClick={handleClick}>
                               <Link to='/'>Submit</Link> 
                               {/* Submit */}
                            </Button>
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                   User Details Update Successfully
                                </Alert>
                            </Snackbar>
                          
                        </Stack>

                    </form>
                </Paper>
            </Grid>
        </div>
    )
}

export default Material