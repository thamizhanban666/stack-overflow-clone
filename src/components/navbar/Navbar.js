import React, { useContext, useState } from 'react'
import menu from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search from '../../assets/search.svg'
import './navbar.css'
import { Link } from 'react-router-dom'
import { myContext} from '../../App'
 
function Navbar() {
  const userContext = useContext(myContext); 

  return (
    <nav className="bg-light p-0 px-xl-5 sticky-top text-center d-flex justify-content-center">
      <div className="d-flex align-items-center justify-content-center flex-fill">
        <button className='btn p-0 border border-0 d-md-none ' onClick={() => { userContext.setShowSidebar(!userContext.showSidebar) }}><img src={menu}></img></button>
        <a id='logo' className='d-flex align-items-center text-decoration-none' style={{cursor:"pointer"}} onClick={()=>window.location.reload()}>
          <span className='ms-1'><img src={logo}></img></span>
          <span className='fs-5 ms-1 d-none d-sm-block text-dark'>stack<span className='fs-5 fw-bold'>overflow</span></span>
        </a>
        <div className='d-flex px-1 btns'>
          <button className='btn rounded-pill d-none d-sm-none d-md-none d-lg-block'>About</button>
          <button className='btn rounded-pill m-xs-1 '>Products</button>
          <button className='btn rounded-pill text-nowrap d-none d-sm-none d-md-none d-lg-block'>For Teams</button>
        </div>
        <div className='flex-fill'>
          <div className=' rounded-1 p-1 mx-1 search-container d-none d-md-block'>
            <span className='p-1'><img src={search} alt='.'></img></span>
            <input className='border-0 ps-1 width ' placeholder='Search' ></input>
          </div>
        </div>
        <div className="d-flex align-items-center ms-auto">
          <button className='border border-0 bg-light me-1 d-md-none'><img src={search}></img></button>
          {
            userContext.user.email?
              <div>
                <div id="avatar" className='dropdown m-1 '>
                <button className="btn btn-sm btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  {userContext.user.name? userContext.user.name[0]:""}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li className='text-center'><h6 className="dropdown-header">{userContext.user.name? userContext.user.name:""}</h6></li>
                  <li className='text-center'><h6 className="dropdown-header">{userContext.user.email? userContext.user.email:""}</h6></li>
                  <li className='text-center'><Link to="/login"><button className='btn btn-sm btn-secondary' onClick={()=>{userContext.setUser({}); window.localStorage.removeItem("myToken")}}>Logout</button></Link></li>
                </ul>
                
                </div>
              </div>
            :
              <div>
                <Link to='/login' className="rounded-1 btn-log m-1 text-nowrap" type="submit">Log in</Link>
                <Link to='signup' className="rounded-1 text-light btn-sign text-nowrap" type="submit">Sign up</Link> 
              </div>
          }
        </div>
        
      </div>
    </nav>
  )
}

export default Navbar