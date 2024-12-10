import React, { useContext, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { dataContext } from '../context/UserContext'
import axios from 'axios'


const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const conData = useContext(dataContext);
    const nav = useNavigate();

    const {data,setData} = conData;

    const submitHandler = async (e) => {
        e.preventDefault();
        const newData = {
            email: email,
            password: password
        }
        const res = await axios.post(`${import.meta.env.VITE_base_url}/user/login`,newData);
        if(res.status === 200){
            const data = res.data
            setData(data.user);
            localStorage.setItem('token',data.token);
            nav('/home');
        }
        setEmail('')
        setPassword('')
    }
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />
                <form onSubmit={(e) => {
                    submitHandler(e)
                }}>
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="email"
                        placeholder='email@example.com'
                    />
                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                    <input
                        className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        required type="password"
                        placeholder='password'
                    />
                    <button
                        className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
                    >Login</button>
                </form>
                <p className='text-center'>New here? <Link to='/UserSignup' className='text-blue-600'>Create new Account</Link></p>
            </div>
            <div>
                <Link
                    to='/CaptainLogin'
                    className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
                >Sign in as Captain</Link>
            </div>
        </div>
    )
}
export default UserLogin