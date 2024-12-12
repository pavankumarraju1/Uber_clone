import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
  const nav = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(()=>{
    const fun=async ()=>{
      try{
        await axios.get(`${import.meta.env.VITE_base_url}/captain/logout`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        }).then((res)=>{
          if(res.status==200){
            localStorage.removeItem('token');
            nav('/captainlogin')
          }
        })
      }
      catch(err){
        console.log("error in captain logout:"+err)
      }
    }
    fun()
  },[nav])

  return (
    <div>logging out...</div>
  )
}

export default CaptainLogout