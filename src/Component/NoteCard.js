import { Button, Card, CardActions, CardContent, CardHeader, IconButton } from '@material-ui/core'
import { DeblurOutlined, DeleteOutline, Favorite } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox'
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';

function NoteCard({ note, handleclick,addToCart}) {
    const [checked, setChecked] = React.useState(false);

    const [name, setname] = useState('');
    const [description, setdescription] = useState('');
    const [quantities, setquantities] = useState('');
    const [price, setprice] = useState('');
    const [profile, setprofile] = useState([]);
   
    let history = useHistory();

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    
    // const addToCart = (data) => {
    //  localStorage.setItem('addtocart',JSON.stringify(data))
    // //   JSON.parse(localStorage.getItem('addtocart',data))
    //   history.push('/cart')
    //  }
    
    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            M
                        </Avatar>
                    }
                    action={
                        <IconButton onClick={() => handleclick(note._id)}>
                            <DeleteOutline />
                        </IconButton>
                    }
                    
                    title={note.name}


                />
                {/* <CardHeader
                    
                    action={
                        <IconButton onClick={() => handleclick1(note._id)}>
                            
                            <EditIcon />
                        </IconButton>
                    }


                /> */}

                <CardContent >
                    <Typography >
                        {note.description}
                    </Typography>
                    <Typography>
                        <img src={note.profile_url} style={{ width: 170, height: 150 }} alt='' />

                    </Typography>
                    <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>

                        price: {note.price}
                    </Typography>
                </CardContent>
                <CardActions>
                <Button onClick={() =>addToCart(note)}>Add to cart</Button>
                    {/* <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    /> */}
                </CardActions>

            </Card>

                 
        </div>
    )
}

export default NoteCard
