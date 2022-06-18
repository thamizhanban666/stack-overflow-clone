import './App.css';
import Navbar from './components/navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Sidebar from './components/sidebar/Sidebar';
import Home from './components/home/Home';
import AddQuestion from './components/add-question/AddQuestion';
import ViewQuestion from './components/view-question/ViewQuestion';
import React, {  useState } from 'react';
import AvatarToggle from './components/navbar/AvatarToggle';

const myContext = React.createContext();
const MyProvider = myContext.Provider;

function App() {
  const [user, setUser] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  const [avatarToggle, setAvatarToggle] = useState(false);

  return (
    <BrowserRouter>
      <MyProvider value={{user, setUser,showSidebar, setShowSidebar,avatarToggle,setAvatarToggle}}>
        <div>
          <Navbar />
          <AvatarToggle/>
          <div className=''>
            <div className='d-none d-md-block'>
              <Sidebar />
            </div>  
            <div className={`d-md-none d-${showSidebar?"block":"none"}`}>
              <Sidebar />
            </div>  
            <div className='margin'>
              <Routes >
                <Route path='/' element={<Login/>} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/home' element={<Home/>} />
                <Route path='/add-question' element={<AddQuestion />} />
                <Route path='/view-question/:id' element={<ViewQuestion />} />
              </Routes>
            </div>
          </div>
        </div>
      </MyProvider>
    </BrowserRouter>   
  );
} 

export default App;
export {myContext};