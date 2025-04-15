import React, { useContext, useState, useRef, useEffect } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { token, setToken, userData } = useContext(AppContext);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(false);
    navigate('/login');
  };

  const handleMobileNavClick = () => {
    setShowMenu(false);
  };

  // Common nav link style for desktop
  const navLinkStyle = ({ isActive }) => 
    isActive ? 'text-green-500' : 'hover:text-green-500';

  // Common nav item style for mobile
  const mobileNavItemStyle = ({ isActive }) => 
    `block px-4 py-2 rounded-full ${isActive ? 'text-green-500' : 'hover:text-green-500'}`;

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]'>
      {/* Logo */}
      <img 
        onClick={() => navigate('/')} 
        className='w-44 cursor-pointer' 
        src={assets.logo} 
        alt="Website Logo" 
        aria-label="Home"
      />
      
      {/* Desktop Navigation */}
      <div className="flex items-center gap-8">
        <ul className='md:flex items-center gap-5 font-medium hidden'>
          <NavLink to='/' className={navLinkStyle}>
            <li className='py-1 relative group'>
              HOME
              <hr className='border-none h-0.5 bg-green-500 w-3/5 m-auto transition-all duration-300 opacity-0 group-hover:opacity-100' />
            </li>
          </NavLink>
          <NavLink to='/doctors' className={navLinkStyle}>
            <li className='py-1 relative group'>
              ALL DOCTORS
              <hr className='border-none h-0.5 bg-green-500 w-3/5 m-auto transition-all duration-300 opacity-0 group-hover:opacity-100' />
            </li>
          </NavLink>
          <NavLink to='/about' className={navLinkStyle}>
            <li className='py-1 relative group'>
              ABOUT
              <hr className='border-none h-0.5 bg-green-500 w-3/5 m-auto transition-all duration-300 opacity-0 group-hover:opacity-100' />
            </li>
          </NavLink>
          <NavLink to='/contact' className={navLinkStyle}>
            <li className='py-1 relative group'>
              CONTACT
              <hr className='border-none h-0.5 bg-green-500 w-3/5 m-auto transition-all duration-300 opacity-0 group-hover:opacity-100' />
            </li>
          </NavLink>
        </ul>

        {/* Admin Panel Link (Desktop) */}
        <a 
          target="_blank" 
          rel="noopener noreferrer"
          href="https://medschedule-fullstack-admin.onrender.com/" 
          className="border border-green-500 text-green-500 hover:bg-green-50 px-5 text-xs py-1.5 rounded-full transition-colors hidden md:block"
        >
          Admin Panel
        </a>
      </div>
     
      {/* User Actions */}
      <div className='flex items-center gap-4'>
        {token && userData ? (
          <div 
            ref={dropdownRef} 
            className='relative'
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className='flex items-center gap-2 cursor-pointer'>
              <img 
                className='w-8 h-8 rounded-full object-cover' 
                src={userData.image} 
                alt="User Profile" 
              />
              <img 
                className={`w-2.5 transition-transform ${showDropdown ? 'rotate-180' : ''}`} 
                src={assets.dropdown_icon} 
                alt="Dropdown" 
              />
            </div>
            
            {/* Dropdown Menu */}
            {showDropdown && (
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20'>
                <div className='py-1'>
                  <button
                    onClick={() => {
                      navigate('/my-profile');
                      setShowDropdown(false);
                    }}
                    className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate('/my-appointments');
                      setShowDropdown(false);
                    }}
                    className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                  >
                    My Appointments
                  </button>
                  {userData.role === 'admin' && (
                    <button
                      onClick={() => {
                        navigate('/admin');
                        setShowDropdown(false);
                      }}
                      className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                    >
                      Admin Panel
                    </button>
                  )}
                  <button
                    onClick={logout}
                    className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={() => navigate('/login')} 
            className='bg-green-500 hover:bg-green-600 text-white px-8 py-2.5 rounded-full font-medium hidden md:block transition-colors'
          >
            Create account
          </button>
        )}

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setShowMenu(true)} 
          className='md:hidden focus:outline-none'
          aria-label="Open menu"
        >
          <img className='w-6' src={assets.menu_icon} alt="Menu" />
        </button>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden fixed inset-0 z-20 bg-white transition-all duration-300 ease-in-out ${showMenu ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
          style={{ display: showMenu ? 'block' : 'none' }}
        >
          <div className='flex items-center justify-between px-5 py-6 border-b'>
            <img src={assets.logo} className='w-36' alt="Logo" />
            <button 
              onClick={() => setShowMenu(false)} 
              className='focus:outline-none'
              aria-label="Close menu"
            >
              <img src={assets.cross_icon} className='w-7' alt="Close" />
            </button>
          </div>
          <ul className='flex flex-col items-center gap-4 mt-8 px-5 text-lg font-medium'>
            <li>
              <NavLink 
                to='/' 
                className={mobileNavItemStyle}
                onClick={handleMobileNavClick}
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink 
                to='/doctors' 
                className={mobileNavItemStyle}
                onClick={handleMobileNavClick}
              >
                ALL DOCTORS
              </NavLink>
            </li>
            <li>
              <NavLink 
                to='/about' 
                className={mobileNavItemStyle}
                onClick={handleMobileNavClick}
              >
                ABOUT
              </NavLink>
            </li>
            <li>
              <NavLink 
                to='/contact' 
                className={mobileNavItemStyle}
                onClick={handleMobileNavClick}
              >
                CONTACT
              </NavLink>
            </li>
            <li>
              <a 
                target="_blank"
                rel="noopener noreferrer"
                href="https://medschedule-fullstack-admin.onrender.com/" 
                className={mobileNavItemStyle({ isActive: false })}
                onClick={handleMobileNavClick}
              >
                Admin Panel
              </a>
            </li>
            {token && userData?.role === 'admin' && (
              <li>
                <button
                  onClick={() => {
                    handleMobileNavClick();
                    navigate('/admin');
                  }}
                  className={mobileNavItemStyle({ isActive: false })}
                >
                  Admin Dashboard
                </button>
              </li>
            )}
            {!token && (
              <li className='w-full mt-4'>
                <button 
                  onClick={() => {
                    handleMobileNavClick();
                    navigate('/login');
                  }}
                  className='w-full bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-medium transition-colors'
                >
                  Create account
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;