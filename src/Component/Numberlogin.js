import axios from 'axios';
import React,{ useState,useEffect } from 'react'
import {useHistory,useParams} from 'react-router-dom'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { IconButton, InputAdornment,TextField } from '@material-ui/core'
import Swal from 'sweetalert2'

function Otp() {
    
    const [phone, setphone] = useState('');
    const [password,setpassword] = useState('');
   

    const { id } = useParams()
    let history = useHistory();
    useEffect(() => {
        localStorage.removeItem("token");
    }, [])


    const handleonclick = () => {
      setpassword(!password)
  }
  const handleonmousedown = () => {
      setpassword(!password)
  } 

    const postData = (e) => {
      e.preventDefault()
      if(phone === '' ||password === ''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Please Enter Phone Number And Password</a>'
          })
    }else{
      let item = {
        
         phone: phone,
          password: password
      }
      console.log(item)

      axios.post("http://localhost:6544/otp", item).then((res) => {
          localStorage.setItem('phone', phone);
           if (res.data.success === true) {
                    
                    Swal.fire(
                        'Login Succesfully',
                        'Otp Send Your Mobile',
                        'success'
                        ) 
                        setTimeout(() => {
                        // window.location.reload(true)
                        history.push('/otp1')
                           
                          }, 2000);
                    }
                    // console.log("updare", res)
                })
          
         
            // history.push('/otp1')
          
  }
}
   
  return (
    <div>
        <section class="vh-100" style={{backgroundcolor: "#9A616D"}}>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card" style={{borderradius: "1rem"}}>
          <div class="row g-0">
            <div class="col-md-6 col-lg-5 d-none d-md-block">
              <img
                src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                alt="login form"
                class="img-fluid" style={{borderradius: "1rem 0 0 1rem"}}
              />
            </div>
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black">

                <form>

                  <div class="d-flex align-items-center mb-3 pb-1">
                    <i class="fas fa-cubes fa-2x me-3" style={{color: "#ff6219"}}></i>
                    <span class="h1 fw-bold mb-0">Medicine Managment</span>
                  </div>

                  <h5 class="fw-normal mb-3 pb-3" style={{letterspacing: "1px"}}>Sign into your account</h5>

                  <div class="form-outline mb-4">
                    <input type="email" id="form2Example17" class="form-control form-control-lg" name='phone' value={phone} onChange={(e)=>setphone(e.target.value)} />
                    <label class="form-label" for="form2Example17">Phone Number</label>
                  </div>

                  <div class="form-outline mb-4">
                  {/* <TextField name='password'id="form2Example27" class="form-control form-control-lg" fullWidth label='Passwrord' variant='outlined' type='password'  value={password}  onChange={(e)=>setpassword(e.target.value)} 
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position='end'>
                                                                <IconButton

                                                                    onClick={handleonclick}
                                                                    onMouseDown={handleonmousedown}
                                                                >
                                                                    {password ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )
                                                    }} /> */}
                     <input type="password" id="form2Example27" class="form-control form-control-lg" name='password' value={password} onChange={(e)=>setpassword(e.target.value)} 
                     InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton

                                            onClick={handleonclick}
                                            onMouseDown={handleonmousedown}
                                        >
                                            {password ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}/>
                    <label class="form-label" for="form2Example27">Password</label>
                  </div>

                  <div class="pt-1 mb-4">
                    <button class="btn btn-dark btn-lg btn-block" type="button" onClick={postData}>Login</button>
                  </div>

                  <a class="small text-muted" href="/forget">Forgot password?</a>
                  <p class="mb-5 pb-lg-2" style={{color: "#393f81"}}>Don't have an account? <a href="/Register" style={{color: "#393f81"}}>Register here</a></p>
                  <a href="#" class="small text-muted">Terms of use.</a>
                  <a href="#!" class="small text-muted">Privacy policy</a>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Otp