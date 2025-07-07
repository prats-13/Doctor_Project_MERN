import { doctors } from "../assets/assets";
import { AppContext } from "./AppContext";

const AppContextProvider= (props)=>{
  const currencySymbol='$'
  const value={
    doctors,
    currencySymbol
  }
  return(
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider