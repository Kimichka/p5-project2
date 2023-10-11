import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
    nav: {
        backgroundColor: '#282c34',
        padding: '10px 0',
    },
    ul: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        justifyContent: 'space-around',
    },
    li: {
        display: 'inline-block',
    },
    link: {
        textDecoration: 'none',
        fontFamily: 'Arial, sans-serif',
        fontSize: '1.2em',
        color: '#61dafb',
        padding: '8px 16px',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
    },
};

const NavBar = () => {
    return (
        <nav style={styles.nav}>
            <ul style={styles.ul}>
                <li style={styles.li}><Link to="/" style={styles.link} onMouseEnter={e => e.target.style.backgroundColor = 'rgba(97, 218, 251, 0.1)'} onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>Home</Link></li>
                <li style={styles.li}><Link to="/login" style={styles.link} onMouseEnter={e => e.target.style.backgroundColor = 'rgba(97, 218, 251, 0.1)'} onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>Login</Link></li>
                <li style={styles.li}><Link to="/register" style={styles.link} onMouseEnter={e => e.target.style.backgroundColor = 'rgba(97, 218, 251, 0.1)'} onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>Register</Link></li>
                <li style={styles.li}><Link to="/games" style={styles.link} onMouseEnter={e => e.target.style.backgroundColor = 'rgba(97, 218, 251, 0.1)'} onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>Games List</Link></li> 
                <li style={styles.li}><Link to="/profile" style={styles.link} onMouseEnter={e => e.target.style.backgroundColor = 'rgba(97, 218, 251, 0.1)'} onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>Profile</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
