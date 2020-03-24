import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css'

function Header(){
    return (
        <Link to="/">
          <div className = 'AppHeader'>
            <h1>Noteful</h1>
          </div>
        </Link>
    )
}

export default Header;