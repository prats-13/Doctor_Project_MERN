import { AppContext } from "./AppContext";

const AppContextProvider=(props)=>{
  const value={

  }
  
  return(
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider