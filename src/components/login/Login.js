import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useFormik } from 'formik';
import swal from 'sweetalert';
import './login.css'
import logo from '../../assets/logo-grey.png'
import facebook from '../../assets/facebook.svg'
import github from '../../assets/github.svg'
import google from '../../assets/google.svg'
import { myContext } from '../../App';

function Login() {
  const userContext = useContext(myContext)
  let navigate = useNavigate()
  const formik = useFormik({
         initialValues: {
            email: "",
            password: "",
         },
         validate: (values) => {
            const errors = {};
            if (!values.email) {
                  errors.email="Email cannot be blank"
            }
            if (!values.password) {
                  errors.password="Password cannot be blank"
            }            
            return errors;
         },
         onSubmit: async (values) => {               
            try {
              let tokenObj = await axios.post("https://stack-overflow-thamizhanban.herokuapp.com/api/user/login", values);
              window.localStorage.setItem("myToken", tokenObj.data.token);
              userContext.setUser(tokenObj.data.user);
              navigate("/home");
            } catch (error) {
              console.log(error);
              alert("login error")
            }     
         }
   })
  return (
    <div id='log-body'>
      <section id='log-section' className="text-center mx-auto ">
        <p><img src={logo}></img></p>
        <button className='log-btns bg-white text-dark'><img src={google} className='me-1'></img>Log in with Google</button>
        <button className='log-btns bg-dark text-white'><img src={github} className='me-1'></img>Log in with GitHub</button>
        <button className='log-btns bg-fb text-white'><img src={facebook} className='me-1'></img>Log in with Facebook</button>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className='d-flex'>
              <label className='justify-self-start fw-bold'>Email</label>
            </div >
            <input id='email' className='log-inp' name="email" onChange={formik.handleChange} value={formik.values.email}></input>
            <div className='d-flex justify-content-between align-items-baseline mt-3'>
              <label className='fw-bold'>Password</label>
              <a className='text-primary text-decoration-none font-sm'>Forgot password?</a>
            </div>
            <input id='password' className='log-inp' name="password" onChange={formik.handleChange} value={formik.values.password}></input>
            <button type='submit' className='login-btn'>Log in</button>
          </form>
        </div>
        <p className='font-sm mt-4'>Don't have an account? <Link to='/signup' className='text-primary text-decoration-none'>Sign up</Link></p>
        <p className='font-sm'>Are you an employer?<a className='text-primary text-decoration-none'>Sign up on Talent</a></p>
        </section>
      </div>
  )
}

export default Login