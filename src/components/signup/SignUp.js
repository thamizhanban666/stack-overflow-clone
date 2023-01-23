import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useFormik } from 'formik';
import swal from 'sweetalert'
import './signup.css'
import facebook from '../../assets/facebook.svg'
import github from '../../assets/github.svg'
import google from '../../assets/google.svg'

function SignUp() {
  let navigate = useNavigate()
  const formik = useFormik({
         initialValues: {
            name: "", 
            email: "",
            password: "",
         },
         validate: (values) => {
            const errors = {};

            if (!values.name) {
                  errors.name="Name cannot be blank"
            }
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
              await axios.post("https://stack-overflow-clone-thamizhanban.vercel.app/api/user/signup", values);
              swal({
                title: `email - ${values.email}`,
                text: "Succefully Registered",
                icon: "success",
                buttons:{ confirm:{className:"btn btn-primary"}}
              })
              navigate("/login");
            } catch (error) {
              console.log(error);
              alert("error")
            }     
         }
   })
  return (
    <div id='sign-body'>
      <section id='sign-section' className="text-center mx-auto ">
        <button className='sign-btns bg-white text-dark'><img src={google} className='me-1'></img>Sign up with Google</button>
        <button className='sign-btns bg-dark text-white'><img src={github} className='me-1'></img>Sign up with GitHub</button>
        <button className='sign-btns bg-fb text-white'><img src={facebook} className='me-1'></img>Sign up with Facebook</button>
        <div>
          <form onSubmit={formik.handleSubmit}>
          <div className='d-flex'>
            <label className='justify-self-start fw-bold'>Display name</label>
          </div >
          <input id='signup-display-name' className='sign-inp' name="name" onChange={formik.handleChange} value={formik.values.name}></input>
          <div className='d-flex mt-3'>
            <label className='justify-self-start fw-bold'>Email</label>
          </div >
          <input id='signup-email' className='sign-inp' name="email" onChange={formik.handleChange} value={formik.values.email}></input>
          <div className='d-flex mt-3'>
            <label className='justify-self-start fw-bold'>Password</label>
          </div >
          <input id='signup-password' className='sign-inp' name="password" onChange={formik.handleChange} value={formik.values.password}></input>
          <div className='font-xsm text-secondary mt-1 text-start'>
            Passwords must contain at least eight characters, including at least 1 letter and 1 number.
          </div>
          <div className='d-flex text-start mt-2'>
            <input type={"checkbox"} className='mt-1' /><span className='ms-1 font-sm fw-bold'>
            Want to get our newsletter and occasional product updates?</span>
          </div>
          <button type='submit' className='signup-btn' disabled={Object.keys(formik.errors).length>0? true:false}>Sign up</button>
          <div className='font-sm mt-4 text-start'>By clicking "Sign up", you agree to our <a className='text-primary text-decoration-none'>terms of service, privacy policy and cookie policy</a></div>
          </form>
        </div>
        <p className='font-sm mt-4'>Already have an account? <Link to='/login' className='text-primary text-decoration-none'>Log in</Link></p>
        <p className='font-sm'>Are you an employer?<a className='text-primary text-decoration-none'>Sign up on Talent</a></p>
        </section>
      </div>
  )
}

export default SignUp