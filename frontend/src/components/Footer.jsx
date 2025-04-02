import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

        <div>
          <img className='mb-5 w-49' src={assets.logo} alt="" />
          <p className='w-full md:w-2/ text-gray-600 leading-6'>Book appointments with trusted doctors effortlessly using MedSchedule, the all-in-one healthcare scheduling app designed to put your well-being first. Whether you need a routine check-up, specialist consultation, or urgent care, MedSchedule connects you with verified medical professionals in just a few taps.</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>DEVELOPERS</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Naman Harbola</li>
            <li>namanharbola3@gmail.com</li>
            <li>+91 8178946367</li>
            <li>Anushka Saxena</li>
            <li>anushkasaxena0906@gmail.com</li>
            <li> +91 9643569565</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025 @ MEDSCHEDULE.com - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
