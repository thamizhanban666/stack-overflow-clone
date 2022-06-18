import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { myContext } from '../../App';

function AvatarToggle() {
  const userContext = useContext(myContext); 
  return (
    <div className={`avatarToggle d-${userContext.avatarToggle?'block':'none'} me-xl-5`} >
        <p className='text-center'><h6 className="">{userContext.user.name? userContext.user.name:""}</h6></p>
        <p className='text-center'><h6 className="">{userContext.user.email? userContext.user.email:""}</h6></p>
      <p className='text-center'><Link to="/login"><button className='btn btn-sm btn-secondary' onClick={() => { userContext.setUser({}); userContext.setAvatarToggle(false) ; window.localStorage.removeItem("myToken")}}>Logout</button></Link></p>
    </div>
  )
}

export default AvatarToggle