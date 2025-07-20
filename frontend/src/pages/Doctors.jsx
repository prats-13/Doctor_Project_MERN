import React, { useEffect, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
  const {speciality}=useParams()
  //console.log(speciality);
  const navigate=useNavigate()
  const [filterDoc,setFilterDoc]=useState([])
  const [showFilter,setShowFilter]=useState(false)
  const {doctors}=useContext(AppContext)
  
  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist',
    'Add any doctor you want to by just adding it in the specialities array in the Doctors.jsx',
  ]

  const applyFilter=()=>{
    if(speciality)
    {
      setFilterDoc(doctors.filter(doctor=>doctor.speciality===speciality))
    } else setFilterDoc(doctors)
  }

  useEffect(()=>{
    applyFilter()
  },
  // eslint-disable-next-line
  [doctors,speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items:start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter?'bg-[#5f6FFF] text-white':''}`} onClick={()=>setShowFilter(prev=>!prev)}>Filters</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter? 'flex': 'hidden sm:flex'}`}>
          {specialities.map((item, index) => (
            <p
              key={index}
              onClick={() =>
                speciality === item ? navigate('/doctors') : navigate(`/doctors/${item}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === item ? 'bg-indigo-100 text-black' : ''
              }`}
            >
              {item}
            </p>
          ))}
        </div>

        <div className='w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 gap-y-6'>
          {
            filterDoc.map((doctor,index)=>(
          <div onClick={()=>navigate(`/appointment/${doctor._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-200' key={index}>
            <img className='bg-blue-50' src={doctor.image} alt="" />
            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                {/* <p className='w-2 h-2 bg-green-500 rounded-full '></p><p>Available</p> */}
                <div className='flex items-center gap-2'>
                  {
                    doctor.available ? <><p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p></>:<><p className='w-2 h-2 bg-red-500 rounded-full '></p><p>Not available</p></>
                  }
                </div>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{doctor.name}</p>
              <p className='text-gray-600 text-sm'>{doctor.speciality}</p>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors