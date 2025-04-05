import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showLoader, setShowLoader] = useState(false)

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)
    setShowLoader(true)

    // Basic validation
    if (!email || !password || (state === 'Sign Up' && !name)) {
      toast.error('Please fill all fields')
      setLoading(false)
      setShowLoader(false)
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      setLoading(false)
      setShowLoader(false)
      return
    }

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { 
          name, 
          email, 
          password 
        })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Account created successfully!')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { 
          email, 
          password 
        })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Logged in successfully!')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
      // Keep loader visible for a bit longer for better UX
      setTimeout(() => setShowLoader(false), 500)
    }
  }

  useEffect(() => {
    if (token) {
      // Optional: Add a small delay before navigation to allow loader to complete
      const timer = setTimeout(() => navigate('/'), 500)
      return () => clearTimeout(timer)
    }
  }, [token, navigate])

  return (
    <>
      {showLoader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="loader"></div>
        </div>
      )}
      
      <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
          <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
          <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>
          
          {state === 'Sign Up' && (
            <div className='w-full'>
              <label htmlFor="name" className='block'>Full Name</label>
              <input 
                id="name"
                onChange={(e) => setName(e.target.value)} 
                value={name} 
                className='border border-[#DADADA] rounded w-full p-2 mt-1' 
                type="text" 
                required 
              />
            </div>
          )}
          
          <div className='w-full'>
            <label htmlFor="email" className='block'>Email</label>
            <input 
              id="email"
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
              className='border border-[#DADADA] rounded w-full p-2 mt-1' 
              type="email" 
              required 
            />
          </div>
          
          <div className='w-full relative'>
            <label htmlFor="password" className='block'>Password</label>
            <input 
              id="password"
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
              className='border border-[#DADADA] rounded w-full p-2 mt-1 pr-10' 
              type={showPassword ? 'text' : 'password'} 
              required 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-8 text-xs text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          
          <button 
            className='bg-green-500 hover:bg-green-600 text-white w-full py-2 my-2 rounded-md text-base disabled:opacity-50 transition-colors' 
            disabled={loading || !email || !password || (state === 'Sign Up' && !name)}
            aria-busy={loading}
          >
            {loading ? 'Processing...' : state === 'Sign Up' ? 'Create account' : 'Login'}
          </button>
          
          {state === 'Sign Up' ? (
            <p>Already have an account? <button type="button" onClick={() => setState('Login')} className='text-primary underline cursor-pointer focus:outline-none'>Login here</button></p>
          ) : (
            <p>Create a new account? <button type="button" onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer focus:outline-none'>Click here</button></p>
          )}
        </div>
      </form>

      <style jsx>{`
        /* From Uiverse.io by doniaskima */
        .loader {
          --c1: #673b14;
          --c2: #f8b13b;
          width: 40px;
          height: 80px;
          border-top: 4px solid var(--c1);
          border-bottom: 4px solid var(--c1);
          background: linear-gradient(90deg, var(--c1) 2px, var(--c2) 0 5px,var(--c1) 0) 50%/7px 8px no-repeat;
          display: grid;
          overflow: hidden;
          animation: l5-0 2s infinite linear;
        }

        .loader::before,
        .loader::after {
          content: "";
          grid-area: 1/1;
          width: 75%;
          height: calc(50% - 4px);
          margin: 0 auto;
          border: 2px solid var(--c1);
          border-top: 0;
          box-sizing: content-box;
          border-radius: 0 0 40% 40%;
          -webkit-mask: linear-gradient(#000 0 0) bottom/4px 2px no-repeat,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          background: linear-gradient(var(--d,0deg),var(--c2) 50%,#0000 0) bottom /100% 205%,
            linear-gradient(var(--c2) 0 0) center/0 100%;
          background-repeat: no-repeat;
          animation: inherit;
          animation-name: l5-1;
        }

        .loader::after {
          transform-origin: 50% calc(100% + 2px);
          transform: scaleY(-1);
          --s: 3px;
          --d: 180deg;
        }

        @keyframes l5-0 {
          80% {
            transform: rotate(0)
          }

          100% {
            transform: rotate(0.5turn)
          }
        }

        @keyframes l5-1 {
          10%,70% {
            background-size: 100% 205%,var(--s,0) 100%
          }

          70%,100% {
            background-position: top,center
          }
        }
      `}</style>
    </>
  )
}

export default Login