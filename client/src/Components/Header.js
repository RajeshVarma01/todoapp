import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='navbar'>
      <ul>
        <li>
            <Link to='/login'>Login</Link>
        </li>
        <li>
            <Link to='/register'>Register</Link>
        </li>
      </ul>
    </div>
  )
}

export default Header
