import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import axios from 'axios'

const AppContextProvider= (props)=>{
  const currencySymbol='$'
  const backendUrl=import.meta.env.VITE_BACKEND_URL
  const [doctors,setDoctors]=useState([])
  const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
  const [userData,setUserData]=useState(false)

  const getDoctorsData=async()=>{
    try{
      const {data}=await axios.get(backendUrl+'/api/doctor/list')
      if(data.success){
        setDoctors(data.doctors)
      }else{
        toast.error(data.message)
      }
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  const loadUserProfileData=async()=>{
    try{
      const {data}=await axios.get(backendUrl+'/api/user/get-profile',{headers:{token}})

      if(data.success){
        setUserData(data.userData)
      }else{
        toast.error(data.message)
      }
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  const value={
    doctors,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData
  }

  useEffect(()=>{
    getDoctorsData(),
    loadUserProfileData
  })

    useEffect(()=>{
      if(token){
        loadUserProfileData()
      }else{
        setUserData(false)
      }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [token])

  return(
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider