import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
    <div className='container'>
        <div className='navbar'>
            <h1>Dev.Dma</h1>
            <div className='nav-links'>
                <a href='https://www.instagram.com/dmnlaali_/'><i className="fa-brands fa-instagram fa-lg"></i></a>
                <a href="https://www.github.com/dmnlaali"><i className="fa-brands fa-github fa-lg"></i></a>
                <a href="https://www.tiktok.com/@dmnlaali_"><i className="fa-brands fa-tiktok fa-lg"></i></a>
            </div>
        </div>
    </div>
    );
};

export default Navbar;