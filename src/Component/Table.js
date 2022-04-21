import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Navbar, Container, Offcanvas, Nav, Form, FormControl, Button, Figure } from 'react-bootstrap'
import { Grid, Paper } from '@material-ui/core';
import NoteCard from './NoteCard';
import { IconButton, InputAdornment } from '@material-ui/core'
import Checkbox from '@mui/material/Checkbox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function Table() {

  const [myArray, setMyArray] = useState([]);
  const { id } = useParams()
  let history = useHistory();
  const items = JSON.parse(localStorage.getItem("addtocart"))
  const [user, setuser] = useState([])
  const [count, setcount] = useState()

  useEffect(() => {
    
    data()
    console.log(items)
    if(items){
      items.forEach(element =>{
        myArray.push(element)
      });
    }
  }, [])

  function data() {
    // let token = localStorage.getItem('token')
    axios.get(`http://localhost:6544/food`)
      .then(res => {
        const tableData = res.data.data;
        setuser(tableData)
        console.log('heyyyy________', res.data)
       
      })
     
  }

  function deleteuser(id) {
    // let token = localStorage.getItem('token')
    console.log(id);
    axios.delete(`http://localhost:6544/food/${id}`)
      .then((result) => {
        console.log("result.data", result.data);
        data()
      })

  }
  function adduser() {

    console.log('hey______add');
    history.push('/add')

  }
  function edituser(id) {

    console.log('heyy_____put', id);
    history.push(`${id}`);

  }

  
  const addcard = (data) => {

    if(myArray.filter(value =>value._id === data._id).length > 0){
      alert('item is selected');
    }else{
      // setTimeout(() => {
        // window.location.reload(false)
          myArray.push(data); 
          console.log(myArray)
          setcount(myArray.length)
          localStorage.setItem('addtocart',JSON.stringify(myArray))
          // history.push('/Cart')
        // }, 1);
    }
   }

  
  

  // const columns = [
  //     {
  //         title: 'name', field: 'name'
  //     },
  //             {
  //         title: 'Description', field: 'description'
  //     },
  //     {
  //         title: 'Quantities', field: 'quantities'
  //     },
  //     {
  //         title: 'Price (per one quantity)', field: 'price'
  //     },
  //     {
  //         title: "Image", field: "profile_url", render: (rowData) => <img src={rowData.profile_url} style={{ width: 120, height: 100}} alt="" />,
  //     },

  // ]
  return (

    
     
      <div>
      <Navbar bg="light" expand={false}>
        <Container fluid>

          <Navbar.Brand href="#">Medicine Shop</Navbar.Brand>

          <IconButton aria-label="cart">
            <a href='/Cart'>
            <StyledBadge badgeContent={myArray.length} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
            </a>
            
          </IconButton>


          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Medicine Shop</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/Table">Medicine List</Nav.Link>
                <Nav.Link href="/User">User</Nav.Link>
                <Nav.Link href="/addbook">Add-Medicine</Nav.Link>
                <Nav.Link href="/Profile">My Profile</Nav.Link>
                {/* <Nav.Link href="/add">Add</Nav.Link> */}
                <Nav.Link href="/pdf">Add User Form</Nav.Link>
                <Nav.Link href="/product">User List</Nav.Link>
                <Nav.Link href="/Logout">Logout</Nav.Link>

              </Nav>
              <Form className="d-flex">
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  label="Search"
                />

                <Button variant="outline-success">Search</Button>



              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Container>
        <Grid container spacing={3}>
          {user.map(user => (
            <Grid item key={user.id} xs={12} md={6} lg={4}>
              <NoteCard note={user} handleclick={deleteuser}  handleclick1={edituser}  addToCart={addcard}/> 
            </Grid>
          ))}
        </Grid>
      </Container>
        </Container>
      </Navbar >
    </div >

  
  )
}





export default Table