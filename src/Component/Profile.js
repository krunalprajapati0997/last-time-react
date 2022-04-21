import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams,Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { TextField } from '@material-ui/core';
import Swal from 'sweetalert2';  

export default function Pp() {
    const { id } = useParams();
    let history = useHistory();

    const [name, setName] = useState("data");
    const [email, setemail] = useState("data");
    const [phonenumber, setphonenumber] = useState("data");
    const [profile, setProfile] = useState([]);
    useEffect(() => {
        data()
        Data()
    }, [])


    function data() {
        let token = localStorage.getItem("token");

        axios.get(`http://localhost:6544/Abc`, { headers: { 'x-access-token': token } }).then((res) => {
            setName(res.data.data.username)
            setemail(res.data.data.email)
            setphonenumber(res.data.data.phone)
            setProfile(res.data.data.profile_url)
            console.log("hbhj", res)
        })
    }

    function Data() {
        
       
        let token = localStorage.getItem("token");

        axios.get(`http://localhost:6544/googelwith`, { headers: { 'x-access-token': token } }).then((res) => {
            setName(res.data.data[0].username)
            setemail(res.data.data[0].email)
            // setphonenumber(res.data.data[0].phone)
            setProfile(res.data.data[0].profile_file)
            console.log("Google", res)
        })
    }

    const postData = () => {

            let token = localStorage.getItem("token");
            
            let FD = new FormData();
            FD.append('username', name);
            FD.append('email',email)
            FD.append('phone',phonenumber)
            FD.append('profile_file', profile[0]);
            console.log("profile", profile);
            axios.put(`http://localhost:6544/${id}`, FD,{ headers: { 'x-access-token': token } })
            history.push('/User')
            
        }
    



    return (
        <div>
            
            <div className='Container'>
            <img src={profile} alt='' height='100' width='100'></img>
                <form>
                    {data}
                    {Data}
                    <div>
                        <TextField value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant='standard'
                            label='Username'
                        />
                    </div>
                    <br />
                    <div>
                        <TextField value={email}
                            onChange={(e) => setemail(e.target.value)}
                            variant='standard'
                            label='Email'
                        />
                    </div>
                    <br />
                    {/* <div>
                        <TextField value={phonenumber} 
                        onChange={(e) => setphonenumber(e.target.value)} 
                        variant='standard'
                        label='Mobilenumber'
                        />
                    </div> */}
                    <br />
                   
                   {/* <input placeholder='profile' type='file' name='profil_url' onChange={(e) => setProfile(e.target.files)} /> */}
                   
                    <br />
                    <br />

                    {/* <Button variant="info" className='mx-3' type='submit' onClick={postData}><Link to="/User">Submit</Link></Button> */}
                    <Button variant="info" type='submit' ><Link to="/Table">Return</Link></Button>
                </form>


            </div>
        </div>
    )
}

