import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import './Dashboard.css'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='dashboard-container'>
      {/* Summary Statistics Section - Simplified */}
      <div className='stats-container'>
        {/* Doctors Card */}
        <div className='stat-card'>
          <img src={assets.doctor_icon} alt="Doctors" />
          <div>
            <p className='stat-value'>{dashData.doctors}</p>
            <p className='stat-label'>Total Doctors</p>
          </div>
        </div>

        {/* Appointments Card - Simplified */}
        <div className='stat-card'>
          <img src={assets.appointments_icon} alt="Appointments" />
          <div>
            <p className='stat-value'>{dashData.appointments}</p>
            <p className='stat-label'>Total Appointments</p>
          </div>
        </div>

        {/* Patients Card - Simplified */}
        <div className='stat-card'>
          <img src={assets.patients_icon} alt="Patients" />
          <div>
            <p className='stat-value'>{dashData.patients}</p>
            <p className='stat-label'>Total Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings Section (unchanged) */}
      <div>
        <div className='section-header'>
          <img src={assets.list_icon} alt="" />
          <p>Latest Bookings</p>
        </div>
        <div className='appointments-list'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='appointment-item' key={index}>
              <img className='doctor-avatar' src={item.docData.image} alt="" />
              <div className='appointment-details'>
                <p className='doctor-name'>{item.docData.name}</p>
                <p className='booking-date'>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <span className='status-badge status-cancelled'>Cancelled</span>
              ) : item.isCompleted ? (
                <span className='status-badge status-completed'>Completed</span>
              ) : (
                <img 
                  onClick={() => cancelAppointment(item._id)} 
                  className='cancel-btn' 
                  src={assets.cancel_icon} 
                  alt="Cancel" 
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard