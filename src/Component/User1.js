import * as React from 'react';
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
import axios from 'axios';
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MedicationIcon from '@mui/icons-material/Medication';
import PersonIcon from '@mui/icons-material/Person';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="http://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();


export default function SignUp() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            quantities: data.get('quantities'),
            //   password: data.get('password'),
        });
    };

    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [gender, setgender] = useState('');
    const [Age, setAge] = useState('');
    const [address, setaddress] = useState('');
   
    let history = useHistory();


    function postData() {
        
        let item = {
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            Age: Age,
            address: address

        }
       
       
        console.log(item)
        axios.post(`http://localhost:6544/happy`, item)
            .then((res) => {
                console.log('hey___sing in', res)
            })
        history.push('/product')
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                        <Avatar className='mx-3' sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <PersonIcon/>
                        </Avatar>
                        ADD USER
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    onChange={(e) => setfirstname(e.target.value)}
            
                                    name="firstname"
                                    required
                                    fullWidth
                                    id="firstname"
                                    label="Firstname"
                                    autoFocus
                                />
                            </Grid>
                            {/* <Grid item xs={12} >
                                <TextField
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoComplete="given-name"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoFocus
                                />
                            </Grid> 
                            <Grid item xs={12} >
                                <TextField
                                    onChange={(e) => setPhone(e.target.value)}
                                    autoComplete="given-name"
                                    name="phone"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="phone"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="given-name"
                                    name="email"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="given-name"
                                    name="password"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    autoFocus
                                />
                            </Grid> */}
                            <Grid item xs={12} >
                                <TextField
                                    onChange={(e) => setlastname(e.target.value)}
                                    required
                                    fullWidth
                                    id="lastname"
                                    label="Lastname"
                                    name="lastname"

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(e) => setgender(e.target.value)}
                                    required
                                    fullWidth
                                    id="gender"
                                    label="Gender"
                                    name="gender"

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(e) => setAge(e.target.value)}
                                    required
                                    fullWidth
                                    id="Age"
                                    label="Age"
                                    name="Age"

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(e) => setaddress(e.target.value)}
                                    required
                                    fullWidth
                                    id="address"
                                   
                                    label="Address"
                                    name="address"

                                />
                            </Grid>

                        </Grid>
                        <Button
                            onClick={postData}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add-Medicine
                        </Button>
                        <Grid container justifyContent="flex-end">

                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}