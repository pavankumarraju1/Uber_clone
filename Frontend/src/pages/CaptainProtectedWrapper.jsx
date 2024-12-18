import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import { captainDataContext } from '../context/CaptainContext';

const CaptainProtectedWrapper = ({ children }) => {

    const [loading, setIsloading] = useState(true)
    const nav = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token'))
    const { data, setData } = useContext(captainDataContext)

    //const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            nav('/captainlogin');
        }
    }, [token, nav])

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

    useEffect(() => {
        async function fun() {
            if (token) {
                await axios.get(`${import.meta.env.VITE_base_url}/captain/profile`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        setData(res.data.user);
                        setIsloading(false)
                    }
                }).catch((err) => {
                    localStorage.removeItem('token');
                    nav('/captainlogin')
                })
            }
        }
        fun()
    }, [nav, token])


    if (loading) {
        return <div>Loading...</div>
    }


    return (

        <>
            {children}
        </>
    )
}

export default CaptainProtectedWrapper