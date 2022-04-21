import React,{useState,useEffect} from 'react'
import { Grid, Paper, TextField } from '@material-ui/core'
import { Button } from 'react-bootstrap'
import { useParams, useHistory, Link } from "react-router-dom"
import {omit} from 'lodash'

// import axios from 'axios'
// import { omit } from 'lodash'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from 'axios'
function Edit() {
    const [open, setOpen] = useState(false);
    const [name, setname] = useState('');
    const [description, setdescription] = useState('');
    const [quantities, setquantities] = useState('');
    const [price, setprice] = useState('');
    const [profile, setProfile] = useState([]);
    const [errors, setErrors] = useState({});
    
    const { id } = useParams()
    let history = useHistory();
    const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' }
    useEffect(() => {
        getuser()
    }, [])
    const getuser = () => {
        if (id === undefined || id === null) {
        } else {
            axios.get(`http://localhost:6544/`).then((result) => {
                console.log("result.data", result)
                if (result.data.success === true) {
                    setname(result.data.user[0].name)
                    setdescription(result.data.user[0].description)
                    setquantities(result.data.user[0].quantities)
                    setprice(result.data.user[0].price)
                    setProfile(result.data.user[0].profile_url)
                } else {
                    return;
                }
            })
        }
    }
    const handleClick = () => {
        let FD = new FormData();
            FD.append('name', name);
            FD.append('description', description);
            FD.append('quantities', quantities);
            FD.append('price', price);
                FD.append('profile_file',profile[0])
        //     axios.post('http://localhost:8000/', FD)
        // let item = {

        //     username: username,
        //     description: description,
        //     quantities: quantities,
        //     price: price,
        //     profile_url:profile
        // }
        // console.log(item)
        axios.put(`http://localhost:6544/e/${id}`, FD ).then((res) => {
            localStorage.getItem('token', res.data.token);
        })
        history.push('/Table')
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
 
  

  return (
    <div>
          <Grid>
                <Paper elevation={20} style={paperStyle}>
                    <Grid align='center'>
                        <h2> Edit Medicine Item</h2>
                    </Grid>
                    <form>
                        <TextField name='name' fullWidth label='Name'  value={name} onChange={(e) => setname(e.target.value)} />
                        <TextField name='description' fullWidth label='Description'  value={description} onChange={(e) => setdescription(e.target.value)} />
                        <TextField name='quantities' fullWidth label='Quantities'value={quantities} onChange={(e) => setquantities(e.target.value)}   />
                        <TextField name='price' fullWidth label='Price' value={price} onChange={(e) => setprice(e.target.value)}   />
                        <TextField name="profile" type="file" onChange={(e) => setProfile(e.target.files)} />
                        <br />
                        <br />
                        <Stack spacing={2} sx={{ width: '100%' }}>
                            <Button variant="outlined" variant="info" onClick={handleClick} > Submit </Button>
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                    This is a success message!
                                </Alert>
                            </Snackbar>
                        </Stack>
                    </form>
                </Paper>
            </Grid>
    </div>
  )
}

export default Edit