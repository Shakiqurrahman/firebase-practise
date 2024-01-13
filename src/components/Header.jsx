import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='header max-width'>
            <h2>Firebase</h2>
            <nav>
                <ul className='nav-links'>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/registar'>Registar</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;