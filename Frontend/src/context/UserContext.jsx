import React, { createContext, useState } from 'react'
export const dataContext = createContext();

const UserContext = (props) => {
    const[data,setData] = useState({
        fullName:{
            firstName:"",
            lastName:""
        },
        email:"",
        password:"",
    })
  return (
  <>
      <dataContext.Provider value={data}>
        {props.children}
      </dataContext.Provider>
  </>     
  )
}

export default UserContext