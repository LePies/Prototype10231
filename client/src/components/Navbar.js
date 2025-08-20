import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaBicycle } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <FaBicycle className="brand-icon" />
          <span>Custom Saddle Fitter</span>
        </Link>

        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/designs" 
            className={`nav-link ${isActive('/designs') ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Saddle Designs
          </Link>

          <Link 
            to="/order" 
            className={`nav-link ${isActive('/order') ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Place Order
          </Link>
          <Link 
            to="/tracking" 
            className={`nav-link ${isActive('/tracking') ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Track Orders
          </Link>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

