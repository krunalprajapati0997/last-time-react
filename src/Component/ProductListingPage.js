import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';

function Table() {

    let history = useHistory();

    const [user, setuser] = useState([])

    useEffect(() => {
        data()
    }, [])

    function data() {
        let token = localStorage.getItem('token')
        axios.get(`http://localhost:6544/happy`,{ headers:{'x-access-token':token}})
            .then(res => {
                console.log('heyyyy________',res.data)
                const tableData = res.data.user;
                setuser(tableData)
                
            })
    }

    function deleteuser(_id) {
        let token = localStorage.getItem('token')
        console.log(_id);
        axios.delete(`http://localhost:6544/happy/${_id}`, { headers:{'x-access-token':token}})
        .then((result) => {
            console.log("result.data", result.data);
           data()
        })

    }
    function adduser(){
       
        console.log('hey______add');
       history.push('/pdf')
        
    }
    function updateuser(_id) {
      
        console.log('heyy_____put',_id);
        history.push(`${_id}`);
       
    }

    const columns = [
        {
            title: 'Firstname', field: 'firstname'
        },
                {
            title: 'Email', field: 'lastname'
        },
        {
            title: 'Gender', field: 'gender'
        },
        {
            title: 'Age', field: 'Age'
        },
        {
            title: 'Address', field: 'address'
        },
       
    ]
    return (

        <div>

            <MaterialTable title=" Material Table"
                data={user}
                columns={columns}

                actions={[
                    {
                        
                        icon: 'edit',
                        tooltip: 'Edit User',
                        onClick: (event, rowData) => updateuser(rowData._id),
                       
                    },
                    

                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => deleteuser(rowData._id)

                    }, 
                    {
                        icon: 'add',
                        tooltip: 'Add User',
                        isFreeAction: true ,
                        onClick: (event, rowData) => adduser(rowData.form)
                      }
                ]}
            />

           

        </div>
    )
}





export default Table