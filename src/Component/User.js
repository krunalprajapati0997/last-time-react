// import MaterialTable from 'material-table';
// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { useHistory } from "react-router-dom";


// function Copy() {
//     let history = useHistory();
//     const [user, setuser] = useState([])
//     useEffect(() => {
//         data()
//     }, [])

//     function data() {
//         let token = localStorage.getItem("token");

//         axios.get(`https://bookstorelibrary.herokuapp.com`,{ headers: { 'x-access-token': token } })
//             .then(res => {
//                 console.log(res)
//                 const tableData = res.data.data
//                 // const array = [];
//                 //  array.push(tableData);
//                 setuser(tableData)
//                 console.log(user)

//             })

//     }
//     function deleteuser(_id) {
//         console.log(_id);
//         let token = localStorage.getItem("token");
//         axios.delete(`http://localhost:6544/${_id}`,{ headers: { 'x-access-token': token } }).then((result) => {
//             console.log("result.data", result);
//             data()

//         })

//     }


//     const columns = [
//         {
//             title: 'Username', field: "username"
//         },
//         {
//             title: "Email", field: "email"

//         },
//         {
//             title: "Mobilenumber", field: "phone"

//         },
//         {
//             title: "Image", field: "profile_url", render: (rowData) => <img src={rowData.profile_url} style={{ width: 120, height: 100}} alt="" />
//         }
//     ]


//     return (

//         <div>

//             <MaterialTable title=" User List"

//                 data={user}
//                 columns={columns}

//                 actions={[
//                     {
//                         icon: 'delete',
//                         tooltip: 'Delete User',
//                         onClick: (event, rowData) => deleteuser(rowData._id)

//                     }
//                 ]}
//             />


//         </div>
//     )
// }




// export default Copy

import SimpleImageSlider from "react-simple-image-slider";
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const images = [

  { url: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" },
  { url: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1lZGljaW5lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" },
  { url: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG1lZGljaW5lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" },
  { url: "https://media.istockphoto.com/photos/bottling-plant-production-line-picture-id1325074871?b=1&k=20&m=1325074871&s=170667a&w=0&h=Qd9ig_XAD7IjGWiXZY0w7-rOdrhNBRMfVVR0jOD6mYo=" },
//   { url: "images/6.jpg" },
//   { url: "images/7.jpg" },
];

const User = () => {
  return (
    <div className="container fluid">
      <SimpleImageSlider
        width={1000}
        height={504}
        images={images}
        showBullets={true}
        showNavs={true}
        autoPlay={1.2}
      />
      <Button type='button' variant="info"><Link to='/Table'>Return</Link></Button>
    </div>
  );
}

export default User
