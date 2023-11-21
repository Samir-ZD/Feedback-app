import React from 'react'
import { Link } from 'react-router-dom'
import {FaQuestion} from 'react-icons/fa'

const headerStyles = {
  backgroundColor:"blue",
   color:"red"
}

function Header() {
  return (
    <header style={headerStyles}>
        <div className="container">
            <h2><Link to='/' style={{ textDecoration: 'none', color: '#ff6a95' }}>Feedback UI</Link>{' '}
            <Link to={'/about'} style={{ textDecoration: 'none', color: '#ff6a95' }}><FaQuestion size={15}/></Link></h2>
        </div>
    </header>
  )
}


export default Header