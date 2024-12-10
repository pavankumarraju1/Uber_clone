import React, { useContext, useEffect } from 'react'
import { dataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';

const UserProtectedWrapper = ({children}) => {


    const{data} = useContext(dataContext);
    const nav = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(()=>{
        if (!token) {
            nav('/userlogin');
    }
},[nav])
    
        return (
            <div>{children}</div>
        )
  
}

export default UserProtectedWrapper