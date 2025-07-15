import { DoctorContext } from "./DoctorContext"

const DoctorContextProvider =(props)=>{
  const value={

  }

  return(
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  )
}

export default DoctorContextProvider