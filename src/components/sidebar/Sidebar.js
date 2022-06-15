import React, { useContext } from 'react'
import './sidebar.css'
import globe from '../../assets/sidebar-globe.svg'
import info from '../../assets/info.svg'
import collectives from '../../assets/sidebar-collectives.png'
import teams from '../../assets/sidebar-teams.png'
import { Link } from 'react-router-dom'
import { myContext} from '../../App'

function Sidebar() {
  const userContext = useContext(myContext); 
  return (
    
      <div id="sidebar" className='ms-xl-5'>
      <div className='mt-4'>
        <Link to='/home' className='p-1 font-14 sidebar-btns' onClick={() => { userContext.setShowSidebar(!userContext.showSidebar) }}>Home</Link>
        <div className='font-xsm text-muted p-1 mt-2'>PUBLIC</div>
        <div className='text-muted font-14 '>
          <Link to='/home'  className='d-flex align-items-center sidebar-btns p-1 py-2' onClick={() => { userContext.setShowSidebar(!userContext.showSidebar) }}>
            <img src={globe}></img>
            <div className='ms-2' >Questions</div>
          </Link>
          <div className='ps-4 p-2 sidebar-btns '>Tags</div>
          <div className='ps-4 p-2 sidebar-btns'>Users</div>
          <div className='ps-4 p-2 sidebar-btns'>Companies</div>
        </div>
        <div className='d-flex justify-content-between align-items-center text-muted p-2 mt-2'>
          <div className='font-xsm'>COLLECTIVES</div>
          <img src={info} className=""></img>
        </div>
        <div className='d-flex align-items-center font-14 p-2 sidebar-btns'>
          <img src={collectives} ></img>
          <div className='ms-1'>Explore collectives</div>
        </div>
        <div className='d-flex justify-content-between align-items-center text-muted p-2 mt-2 '>
          <div className='font-xsm'>TEAMS</div>
          <img src={info}></img>
        </div>
        <div className='d-flex align-items-center font-14 p-2 sidebar-btns'>
          <img src={teams} ></img>
          <div className='ms-1'>Create free Team</div>
        </div>
      </div>
      </div>
     
  )
}

export default Sidebar