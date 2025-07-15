import { AdminContext } from "./AdminContext";

const AdminContextProvider =(props)=>{
  const value={

  }

  return(
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider