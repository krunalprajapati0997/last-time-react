// // // import { useState, useEffect } from 'react';

// // // const useLocalStorage = (key, initialValue) => {
// // //   const [value, setValue] = useState(() => {
// // //     try {
// // //       const localValue = window.localStorage.getItem(key);
// // //       return localValue ? JSON.parse(localValue) : initialValue;
// // //     } catch (error) {
// // //       return initialValue;
// // //     }
// // //   });

// // //   useEffect(() => {
// // //     window.localStorage.setItem(key, JSON.stringify(value));
// // //   }, [key, value]);

// // //   return [value, setValue];
// // // };

// // // export default useLocalStorage;
// // import MaterialTable from 'material-table';
// // import React, { useState, useEffect } from 'react'
// // import axios from 'axios';
// // import { Link, useParams } from 'react-router-dom';
// // import { useHistory } from "react-router-dom";
// // import { Navbar, Container, Offcanvas, Nav, Form, FormControl, Button, Figure, } from 'react-bootstrap'
// // import { Grid, Paper, CardActions } from '@material-ui/core';
// // import NoteCard from './NoteCard';
// // import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// // function Table() {
// //   const { id } = useParams()
// //   let history = useHistory();

// //   const [user, setuser] = useState([])
// //   const [myArray, setMyArray] = useState([]);
// //   useEffect(() => {
// //     // if (localStorage.getItem("shoping") != null) {
// //       const fhyh = JSON.parse(localStorage.getItem("shoping"))
// //       console.log("hgdfghfgfgdrtg", fhyh)
// //     setMyArray([...myArray,fhyh])
// //     // }
// //     data()
// //   }, [])

// //   function data() {
// //     // let token = localStorage.getItem('token')
// //     axios.get(`http://localhost:8080/food`)
// //       .then(res => {
// //         const tableData = res.data.data;
// //         setuser(tableData)
// //         console.log('heyyyy________', res.data)
// //       })
// //   }

// //   function deleteuser(id) {
// //     // let token = localStorage.getItem('token')
// //     console.log(id);
// //     axios.delete(`http://localhost:8080/food/${id}`)
// //       .then((result) => {
// //         console.log("result.data", result.data);
// //         data()
// //       })

// //   }
// //   // function adduser() {

// //   //   console.log('hey______add');
// //   //   history.push('/add')

// //   // }
// //   // function updateuser(id) {

// //   //   console.log('heyy_____put', id);
// //   //   history.push(`/e/${id}`);

// //   // }
// //   function addCart(data) {
// //     // myArray.push(data);

// //     setMyArray([...myArray,data])
// //     console.log(myArray)
// //     localStorage.setItem("shoping", JSON.stringify(data))
  
// //       // history.push('/Cart') 
    

      
// //   }

// //   // const columns = [
// //   //     {
// //   //         title: 'name', field: 'name'
// //   //     },
// //   //             {
// //   //         title: 'Description', field: 'description'
// //   //     },
// //   //     {
// //   //         title: 'Quantities', field: 'quantities'
// //   //     },
// //   //     {
// //   //         title: 'Price (per one quantity)', field: 'price'
// //   //     },
// //   //     {
// //   //         title: "Image", field: "profile_url", render: (rowData) => <img src={rowData.profile_url} style={{ width: 120, height: 100}} alt="" />,
// //   //     },

// //   // ]
// //   return (

// //     <div>
    

// //       {/* <MaterialTable title=" Material Table"
// //                 data={user}
// //                 columns={columns}

// //                 actions={[
// //                     {
                        
// //                         icon: 'edit',
// //                         tooltip: 'Edit User',
// //                         // onClick: (event, rowData) => updateuser(rowData._id),
                       
// //                     },
                    

// //                     {
// //                         icon: 'delete',
// //                         tooltip: 'Delete User',
// //                         // onClick: (event, rowData) => deleteuser(rowData._id)

// //                     }, 
// //                     {
// //                         icon: 'add',
// //                         tooltip: 'Add User',
// //                         isFreeAction: true ,
// //                         // onClick: (event, rowData) => adduser(rowData._id)
// //                       }
// //                 ]}
// //             /> */}

// //       <CardActions>
// //         <Link to='/Add'> <AddCircleOutlineIcon />Add</Link>

// //       </CardActions>

// //       <Container>
// //         <Grid container spacing={3}>
// //           {user.map(user => (
// //             <Grid item key={user.id} xs={12} md={6} lg={4}>
// //               <NoteCard note={user} handleclick={deleteuser} addcart={addCart} />
// //             </Grid>
// //           ))}
// //         </Grid>
// //       </Container>


// //     </div>
// //   )
// // }







// import React, { useState, useEffect } from 'react'
// import { useCart } from 'react-use-cart'
// import { Link, useHistory, useParams } from "react-router-dom";
// import Badge from '@mui/material/Badge';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import axios from 'axios';
// import Snackbar from '@mui/material/Snackbar';
// import Button from "@material-ui/core/Button";
// import jsPDF from "jspdf";
// import html2canvas from 'html2canvas'
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// function Cart() {
//   const { id } = useParams();
//   const initialvalue = JSON.parse(localStorage.getItem("addtocart"));
//   const [myArray, setMyArray] = useState(initialvalue);
//   const [item, setitem] = useState(initialvalue)
//   const itemsPrice = item.reduce((a, c) => a + c.quantities * c.price, 0);
//   const totalPrice = itemsPrice
//   const [open, setOpen] = React.useState(false);

//   const print = () => {
//     // setOpen(true);

//     const divToDisplay = document.getElementById('div')
//     html2canvas(divToDisplay,
//       {
//         useCORS: true, //By passing this option in function Cross origin images will be rendered properly in the downloaded version of the PDF
//         onrendered: function (canvas) {
//           divToDisplay.appendChild(canvas);
//         }
//       }).then(function (canvas) {
//         const divImage = canvas.toDataURL("image/png");
//         const pdf = new jsPDF();
//         pdf.addImage(divImage, 'PNG', 0, 0);
//         pdf.save("download.pdf");
//       })
//   };

//   function myFunction() {
//     let text = "Download your free Recipe !\nEither OK or Cancel.";
//     if (window.confirm(text) == true) {
//       text = print()
//     } else {
//       text = "You canceled!";
//     }
//   }
//   const xyz = (index) => {
//     const list = [...item];
//     list.splice(index, 1);
//     setitem(list);
//     console.log(list, "sbdj")
//     localStorage.setItem('addtocart', JSON.stringify(list))
//   }
//   const handleChange = (items_id) => {
//     setitem(item => item.map((test) => items_id === test._id ? { ...test, quantities: parseInt(test.quantities) + 1 } : test))
//   }
//   const handleChange1 = (items_id) => {
//     setitem(item => item.map((item) => items_id === item._id ? { ...item, quantities: parseInt(item.quantities) - 1 } : item))
//   }
//   return (

//     <div>
//       <div id='div'>
//         <table class="table table-bordered">
//           <thead>
//             <tr>
//               <th scope="col">Image</th>
//               <th scope="col">Medicinename</th>
//               <th scope="col">description</th>
//               <th scope="col">price</th>
//               <th style={{ width: "100px" }} scope="col">AddItem</th>


//             </tr>
//           </thead>
//           {
//             item.map((items, i) => {
//               // console.log(i)
//               return (
//                 <tbody>
//                   <tr key={i}>

//                     <td style={{ width: "100px" }} ><img src={items.photo_path} style={{ height: '100px', width: "80px" }} /></td>
//                     <td style={{ width: "100px" }}>{items.name}</td>
//                     <td style={{ width: "100px" }}>{items.description}</td>
//                     <td style={{ width: "100px" }}> {items.price}</td>

//                     <td>
//                       <button onClick={() => handleChange(items._id)}>+</button>
//                       <button>{items.quantities}</button>
//                       <button onClick={() => handleChange1(items._id)}>-</button>
//                     </td>
//                     <td style={{ width: "100px" }}>
//                       {items.quantities * items.price}
//                     </td>
//                     <td style={{ width: "100px" }}>
//                       <button className='btn btn-danger ms-2'
//                         onClick={() => xyz(i)}>
//                         <DeleteOutlineIcon /></button>
//                     </td>
//                   </tr>
//                 </tbody>
//               )
//             })
//           }
//           <tfoot>
//             <tr>
//               <td>total price :{totalPrice}</td>
//               <td>
//                 <h2> </h2>
//               </td>
//             </tr>
//           </tfoot>


//         </table>

//       </div>
//       <button className='btn btn-dark' onClick={myFunction}>Print</button>
//       {/* <Snackbar
//         open={open}
//         autoHideDuration={10000}
//         onClose={handleClose}
//         message="Conform This Order"
//         action={Cart}
//       /> */}
//     </div>

//   )
// }

// export default Cart


// import React, { useState, useEffect } from 'react'
// import { useCart } from 'react-use-cart'
// import { Link, useHistory, useParams } from "react-router-dom";
// import Badge from '@mui/material/Badge';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import axios from 'axios';
// import Snackbar from '@mui/material/Snackbar';
// import Button from "@material-ui/core/Button";
// import jsPDF from "jspdf";
// import html2canvas from 'html2canvas'
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// function Cart() {
//   const { id } = useParams();
//   const initialvalue = JSON.parse(localStorage.getItem("addtocart"));
//   const [myArray, setMyArray] = useState(initialvalue);
//   const [item, setitem] = useState(initialvalue)
//   const itemsPrice = item.reduce((a, c) => a + c.quantities * c.price, 0);
//   const totalPrice = itemsPrice
//   const [open, setOpen] = React.useState(false);

//   const print = () => {
//     // setOpen(true);

//     const divToDisplay = document.getElementById('div')
//     html2canvas(divToDisplay,
//       {
//         useCORS: true, //By passing this option in function Cross origin images will be rendered properly in the downloaded version of the PDF
//         onrendered: function (canvas) {
//           divToDisplay.appendChild(canvas);
//         }
//       }).then(function (canvas) {
//         const divImage = canvas.toDataURL("image/png");
//         const pdf = new jsPDF();
//         pdf.addImage(divImage, 'PNG', 0, 0);
//         pdf.save("download.pdf");
//       })
//   };

//   function myFunction() {
//     let text = "Download your free Recipe !\nEither OK or Cancel.";
//     if (window.confirm(text) == true) {
//       text = print()
//     } else {
//       text = "You canceled!";
//     }
//   }
//   const xyz = (index) => {
//     const list = [...item];
//     list.splice(index, 1);
//     setitem(list);
//     console.log(list, "sbdj")
//     localStorage.setItem('addtocart', JSON.stringify(list))
//   }
//   const handleChange = (items_id) => {
//     setitem(item => item.map((test) => items_id === test._id ? { ...test, quantities: parseInt(test.quantities) + 1 } : test))
//   }
//   const handleChange1 = (items_id) => {
//     setitem(item => item.map((item) => items_id === item._id ? { ...item, quantities: parseInt(item.quantities) - 1 } : item))
//   }
//   return (

//     <div>
//       <div id='div'>
//         <table class="table table-bordered">
//           <thead>
//             <tr>
//               <th scope="col">Image</th>
//               <th scope="col">Medicinename</th>
//               <th scope="col">description</th>
//               <th scope="col">price</th>
//               <th style={{ width: "100px" }} scope="col">AddItem</th>


//             </tr>
//           </thead>
//           {
//             item.map((items, i) => {
//               // console.log(i)
//               return (
//                 <tbody>
//                   <tr key={i}>

//                     <td style={{ width: "100px" }} ><img src={items.photo_path} style={{ height: '100px', width: "80px" }} /></td>
//                     <td style={{ width: "100px" }}>{items.name}</td>
//                     <td style={{ width: "100px" }}>{items.description}</td>
//                     <td style={{ width: "100px" }}> {items.price}</td>

//                     <td>
//                       <button onClick={() => handleChange(items._id)}>+</button>
//                       <button>{items.quantities}</button>
//                       <button onClick={() => handleChange1(items._id)}>-</button>
//                     </td>
//                     <td style={{ width: "100px" }}>
//                       {items.quantities * items.price}
//                     </td>
//                     <td style={{ width: "100px" }}>
//                       <button className='btn btn-danger ms-2'
//                         onClick={() => xyz(i)}>
//                         <DeleteOutlineIcon /></button>
//                     </td>
//                   </tr>
//                 </tbody>
//               )
//             })
//           }
//           <tfoot>
//             <tr>
//               <td>total price :{totalPrice}</td>
//               <td>
//                 <h2> </h2>
//               </td>
//             </tr>
//           </tfoot>


//         </table>

//       </div>
//       <button className='btn btn-dark' onClick={myFunction}>Print</button>
//       {/* <Snackbar
//         open={open}
//         autoHideDuration={10000}
//         onClose={handleClose}
//         message="Conform This Order"
//         action={Cart}
//       /> */}
//     </div>

//   )
// }

// export default Cart