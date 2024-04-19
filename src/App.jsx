import { useState } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaSearch } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaRoute } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import { IoHelpBuoy } from "react-icons/io5";
import { FaListCheck } from "react-icons/fa6";

import Menu from './components/Menu/Menu';
import Content from './components/Content/Content';
function App() {
  const [mode, setMode] = useState('Route')



  return (
    <>
      <div className='Page'>
        <div className='Full'>
          <Menu mode={mode} setMode={setMode}/>
          <Content mode={mode}/>
        </div>


      </div>
    </>
  )
}

export default App