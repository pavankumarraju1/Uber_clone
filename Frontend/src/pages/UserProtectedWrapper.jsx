import React, { useContext, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { dataContext } from '../context/UserContext';
 import axios from 'axios';

const UserProtectedWrapper = ({children}) => {
    
    const nav = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token'))
    const[loading,setIsloading] = useState(true)
    const{data,setData} = useContext(dataContext)
    //const token = localStorage.getItem('token');

    useEffect(()=>{
        if (!token) {
            nav('/userlogin');
    }
},[token,nav])

    useEffect(() => {
        // Listen for localStorage changes
        const handleStorageChange = () => {
            setToken(localStorage.getItem('token')); // Update state when token changes
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(()=>{
        async function fun(){
            if (token) {
                await axios.get(`${import.meta.env.VITE_base_url}/user/profile`,{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                }).then((res)=>{
                    if(res.status==200){
                        setData(res.data.user)
                        setIsloading(false)
                    }
                }).catch((err)=>{
                    localStorage.removeItem('token')
                    nav('/userlogin')
                })
            }
        }
        fun()
    },[nav,token])

    if(loading){
        return <div>loding....</div>
    }
    
        return (
            <div>{children}</div>
        )
  
}

export default UserProtectedWrapper