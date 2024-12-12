
import React, { createContext, useState } from 'react'

export const captainDataContext = createContext();

const CaptainContext = ({children}) => {
    const [data,setData] = useState({
        fullName:{
            firstName:"",
            lastName:""
        },
        email:"",
        password:"",
        vehicle:{
            colour:"",
            plateNumber:"",
            capacity:"",
            vehicleType:""
        }
    });
  return (
    <captainDataContext.Provider value={{data, setData}}>
        {children}
    </captainDataContext.Provider>
  )
}

export default CaptainContext