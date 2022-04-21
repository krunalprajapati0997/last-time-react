// /* eslint-disable no-unused-vars */
// import React, { useState } from 'react'
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import { Navbar, Container, Offcanvas, Nav, Form, FormControl, Button } from 'react-bootstrap'
// import TextField from "@mui/material/TextField";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Avatar from '@mui/material/Avatar';
// import { IconButton, InputAdornment } from '@material-ui/core'
// import MailOutlineIcon from '@mui/icons-material/MailOutline';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import Table from '../Component/Table'
// import Badge from '@mui/material/Badge';
// import { styled } from '@mui/material/styles';
// import { useHistory } from "react-router-dom"




// const StyledBadge = styled(Badge)(({ theme }) => ({
//   '& .MuiBadge-badge': {
//     right: -3,
//     top: 13,
//     border: `2px solid ${theme.palette.background.paper}`,
//     padding: '0 4px',
//   },
// }));

// function Menu(props) {

//   const initialize = JSON.parse(localStorage.getItem("addtocart"))
//   // const [count, setcount] = useState()
//   // let history = useHistory()
//   // const [myArray, setMyArray] = useState(initialize);

  




//   return (
//     <div>
//       <Navbar bg="light" expand={false}>
//         <Container fluid>

//           <Navbar.Brand href="#">Book Shop</Navbar.Brand>

//           {/* <IconButton aria-label="cart">
//             <a href='/Cart'>
//             <StyledBadge badgeContent={myArray.length} color="secondary">
//               <ShoppingCartIcon />
//             </StyledBadge>
//             </a>
            
//           </IconButton> */}


//           <Navbar.Toggle aria-controls="offcanvasNavbar" />
//           <Navbar.Offcanvas
//             id="offcanvasNavbar"
//             aria-labelledby="offcanvasNavbarLabel"
//             placement="end"
//           >
//             <Offcanvas.Header closeButton>
//               <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
//             </Offcanvas.Header>
//             <Offcanvas.Body>
//               <Nav className="justify-content-end flex-grow-1 pe-3">
//                 <Nav.Link href="/Table">Medicine List</Nav.Link>
//                 <Nav.Link href="/User">User List</Nav.Link>
//                 <Nav.Link href="/addbook">Add-Medicine</Nav.Link>
//                 <Nav.Link href="/Profile">My Profile</Nav.Link>
//                 <Nav.Link href="/add">Add</Nav.Link>
//                 <Nav.Link href="/Logout">Logout</Nav.Link>

//               </Nav>
//               <Form className="d-flex">
//                 <TextField
//                   id="outlined-basic"
//                   variant="outlined"
//                   fullWidth
//                   label="Search"
//                 />

//                 <Button variant="outline-success">Search</Button>



//               </Form>
//             </Offcanvas.Body>
//           </Navbar.Offcanvas>
//         </Container>
//       </Navbar >
//     </div >
//   )
// }

// export default Menu