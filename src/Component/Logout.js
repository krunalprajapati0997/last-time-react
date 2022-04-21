import React,{useEffect} from 'react'
import {useHistory} from "react-router-dom"
import Swal from 'sweetalert2'


function Logout() {
  let history =useHistory()
        localStorage.clear()
        Swal.fire({
          position: 'center-center',
          icon: 'success',
          title: 'Logout has been succesfully',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          window.location.reload(true)
            history.push('/')
        }, 1000);
    
  return (
    <div>
        
    </div>
  )
}

export default Logout