import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';

const LoadingAnimation = () => {
  useEffect(() => {
    // Inject the animation styles when component mounts
    const style = document.createElement('style');
    style.textContent = `
      @keyframes loading {
        0% { width: 0; }
        80% { width: 100%; }
        100% { width: 100%; }
      }
      @keyframes blink {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
      }
      .loading-animation .dot:nth-child(2) { animation-delay: 0.3s; }
      .loading-animation .dot:nth-child(3) { animation-delay: 0.6s; }
      .loading-animation .dot { 
        animation: blink 1.5s infinite; 
        margin-left: 3px; 
      }
      .loading-animation .loading-bar {
        animation: loading 2s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="loading-animation loader flex flex-col items-center gap-2">
        <div className="loading-text text-gray-800 text-lg font-semibold">
          Loading<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
        </div>
        <div className="loading-bar-background w-48 h-7 bg-gray-200 rounded-full p-1 shadow-inner shadow-gray-300">
          <div className="loading-bar relative h-5 rounded-full bg-gradient-to-b from-orange-600 to-yellow-400">
            <div className="white-bars-container absolute flex items-center gap-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="white-bar w-2 h-11 opacity-30 bg-gradient-to-br from-white to-white/0 rotate-45"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const [loginType, setLoginType] = useState('Admin');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { setDToken } = useContext(DoctorContext);
  const { setAToken } = useContext(AdminContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleLoginType = () => {
    setLoginType(prev => prev === 'Admin' ? 'Doctor' : 'Admin');
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = loginType === 'Admin' 
        ? '/api/admin/login' 
        : '/api/doctor/login';
      
      const { data } = await axios.post(backendUrl + endpoint, formData);
      
      if (data.success) {
        const tokenKey = loginType === 'Admin' ? 'aToken' : 'dToken';
        const setToken = loginType === 'Admin' ? setAToken : setDToken;
        
        setToken(data.token);
        localStorage.setItem(tokenKey, data.token);
        toast.success(`Welcome, ${loginType}!`);
        if (loginType === 'Admin') {
          window.location.href = 'https://medschedule-fullstack-admin.onrender.com/admin-dashboard'; 
        } else {
         window.location.href = 'https://medschedule-fullstack-admin.onrender.com/doctor-dashboard';
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
      {isLoading && <LoadingAnimation />}
      
      <form 
        onSubmit={onSubmitHandler} 
        className={`w-full max-w-md transition-opacity ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
      >
        <div className="flex flex-col gap-4 m-auto items-start p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-2xl font-semibold m-auto">
            <span className="text-primary">{loginType}</span> Login
          </h1>
          
          <div className="w-full">
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
          </div>
          
          <div className="w-full">
            <label htmlFor="password" className="block mb-1">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2 pr-10"
                required
                minLength="6"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-500"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white w-full py-2 rounded-md text-base hover:from-green-600 hover:to-green-700 disabled:opacity-70"
          >
            Login
          </button>
          
          <p className="text-sm">
            {loginType === 'Admin' ? 'Doctor' : 'Admin'} Login?{' '}
            <button
              type="button"
              onClick={toggleLoginType}
              className="text-primary underline cursor-pointer focus:outline-none"
            >
              Click here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;