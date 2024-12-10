import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {

    const nav = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fun = async()=>{
            try {
                const res = await axios.get(`${import.meta.env.VITE_base_url}/user/logout`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }).then((res)=>{
                    if (res.status === 200) {
                        localStorage.removeItem('token');
                        nav('/userlogin');
                    }
                })

            } catch (error) {
                console.error('Error during logout:', error);
            }
        }
        fun()
        
    }, [nav]);

    return <div>Logging out...</div>;
}

export default UserLogout