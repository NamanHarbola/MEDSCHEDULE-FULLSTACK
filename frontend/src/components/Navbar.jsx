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

        {/* Admin Panel and GitHub Links (Desktop) */}
        <div className="flex items-center gap-4 hidden md:flex">
          <a 
            target="_blank" 
            rel="noopener noreferrer"
            href="https://medschedule-fullstack-admin.onrender.com/" 
            className="border border-green-500 text-green-500 hover:bg-green-50 px-5 text-xs py-1.5 rounded-full transition-colors"
          >
            Admin Panel
          </a>
          <a
            href="https://github.com/NamanHarbola/MEDSCHEDULE-FULLSTACK.git"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-github"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99992 1.33331C7.12444 1.33331 6.25753 1.50575 5.4487 1.84078C4.63986 2.17581 3.90493 2.66688 3.28587 3.28593C2.03563 4.53618 1.33325 6.23187 1.33325 7.99998C1.33325 10.9466 3.24659 13.4466 5.89325 14.3333C6.22659 14.3866 6.33325 14.18 6.33325 14C6.33325 13.8466 6.33325 13.4266 6.33325 12.8733C4.48659 13.2733 4.09325 11.98 4.09325 11.98C3.78659 11.2066 3.35325 11 3.35325 11C2.74659 10.5866 3.39992 10.6 3.39992 10.6C4.06659 10.6466 4.41992 11.2866 4.41992 11.2866C4.99992 12.3 5.97992 12 6.35992 11.84C6.41992 11.4066 6.59325 11.1133 6.77992 10.9466C5.29992 10.78 3.74659 10.2066 3.74659 7.66665C3.74659 6.92665 3.99992 6.33331 4.43325 5.85998C4.36659 5.69331 4.13325 4.99998 4.49992 4.09998C4.49992 4.09998 5.05992 3.91998 6.33325 4.77998C6.85992 4.63331 7.43325 4.55998 7.99992 4.55998C8.56659 4.55998 9.13992 4.63331 9.66659 4.77998C10.9399 3.91998 11.4999 4.09998 11.4999 4.09998C11.8666 4.99998 11.6333 5.69331 11.5666 5.85998C11.9999 6.33331 12.2533 6.92665 12.2533 7.66665C12.2533 10.2133 10.6933 10.7733 9.20659 10.94C9.44659 11.1466 9.66659 11.5533 9.66659 12.1733C9.66659 13.0666 9.66659 13.7866 9.66659 14C9.66659 14.18 9.77325 14.3933 10.1133 14.3333C12.7599 13.44 14.6666 10.9466 14.6666 7.99998C14.6666 7.1245 14.4941 6.25759 14.1591 5.44876C13.8241 4.63992 13.333 3.90499 12.714 3.28593C12.0949 2.66688 11.36 2.17581 10.5511 1.84078C9.7423 1.50575 8.8754 1.33331 7.99992 1.33331V1.33331Z"
                fill="currentcolor"
              ></path>
            </svg>
            <span>View on Github</span>
          </a>
        </div>
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
            <li>
              <a 
                href="https://github.com/NamanHarbola/MEDSCHEDULE-FULLSTACK.git"
                target="_blank"
                rel="noopener noreferrer"
                className={mobileNavItemStyle({ isActive: false })}
                onClick={handleMobileNavClick}
              >
                View on GitHub
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

      {/* Add the CSS for the GitHub button */}
      <style jsx>{`
        .btn-github {
          cursor: pointer;
          display: flex;
          gap: 0.5rem;
          border: none;
          transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
          border-radius: 100px;
          font-weight: 800;
          place-content: center;
          padding: 0.55rem 1rem;
          font-size: 0.9000rem;
          line-height: 1rem;
          background-color: rgba(0, 0, 0, 0.4);
          box-shadow:
            inset 0 1px 0 0 rgba(255, 255, 255, 0.04),
            inset 0 0 0 1px rgba(255, 255, 255, 0.04);
          color: #fff;
        }
        .btn-github:hover {
          box-shadow:
            inset 0 1px 0 0 rgba(255, 255, 255, 0.08),
            inset 0 0 0 1px rgba(252, 232, 3, 0.08);
          color: #50C878;
          transform: translate(0, -0.25rem);
          background-color: rgba(0, 0, 0, 9);
        }
      `}</style>
    </div>
  );
};

export default Navbar;