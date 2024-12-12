import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { captainDataContext } from '../context/CaptainContext'


const CaptainSignup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [capacity,setCapacity] = useState(0)
    const [colour,setColour] = useState('')
    const [plateNumber, setPlateNumber] = useState('')
    const [vehicleType,setVehicleType] = useState('')

    const{data,setData} = useContext(captainDataContext);

    const nav = useNavigate();

    const submitHandler = async(e) => {
        e.preventDefault()
        const newData = {
            fullName: {
                firstName,
                lastName
            },
            email,
            password,
            vehicle:{
                colour,
                plateNumber,
                vehicleType,
                capacity
            }
        }
        const res = await axios.post(`${import.meta.env.VITE_base_url}/captain/register`,newData);
        if(res.status==201){
            const resData = res.data;
            setData(resData.captainData);
            localStorage.setItem('token',resData.token)
            nav('/captainHome')
        }
        setEmail('')
        setFirstName('')
        setLastName('')
        setPassword('')
        setCapacity(0)
        setColour('')
        setVehicleType('')
        setPlateNumber('')
    }
    return (
        <div className='py-5 px-5 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
                <form onSubmit={(e) => {
                    submitHandler(e)
                }}>
                    <h3 className='text-lg w-full  font-medium mb-2'>What's our Captain's name</h3>
                    <div className='flex gap-4 mb-5'>
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                            type="text"
                            placeholder='First name'
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value)
                            }}
                        />
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                            type="text"
                            placeholder='Last name'
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value)
                            }}
                        />
                    </div>
                    <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        className='bg-[#eeeeee] mb-5 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="email"
                        placeholder='email@example.com'
                    />
                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                    <input
                        className='bg-[#eeeeee] mb-5 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        required type="password"
                        placeholder='password'
                    />
                    

                    <h2 className='text-3xl font-medium mb-3 text-center'>Vehicle Details</h2>
                    <div className='flex justify-between'>
                    <div className='w-1/2 px-4'>
                        {/* <h3 className='text-lg  font-medium mb-2'>capacity</h3> */}
                        <input
                            required
                            value={capacity}
                            onChange={(e) => {
                                setCapacity(e.target.value)
                            }}
                            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                            type="number"
                            placeholder='capacity'
                        />
                        {/* <h3 className='text-lg font-medium mb-2'>vehicle plate number</h3> */}
                        <input
                            required
                            value={plateNumber}
                            onChange={(e) => {
                                setPlateNumber(e.target.value)
                            }}
                            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                            type="text"
                            placeholder='AP 03 1432'
                        />
                    </div>
                    <div className='w-1/2 px-4'> 
                       {/* <h3 className='text-lg font-medium mb-2'>vehicle colour</h3> */}
                        <input
                            required
                            value={colour}
                            onChange={(e) => {
                                setColour(e.target.value)
                            }}
                            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                            type="text"
                            placeholder='colour'
                        />
                        {/* <h3 className='text-lg  font-medium mb-2'>vehicle type</h3> */}
                        <select className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' placeholder="select any option" 
                        value={vehicleType}
                        onChange={(e) => {
                            setVehicleType(e.target.value)
                        }}
                        >
                            <option value="" disabled>vehicle type</option>
                            <option value="car">car</option>
                            <option value="bike">bike</option>
                            <option value="auto">auto</option>
                        </select>
                    </div>
                    </div> 
                    <button
                        className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
                    >Create Captain Account</button>
                </form>
                <p className='text-center mb-4'>Already have a account? <Link to='/CaptainLogin' className='text-blue-600'>Login here</Link></p>
            </div>
            <div className='flex justify-center'>
                <p className='text-[10px] leading-tight mb-5'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
                    Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
            </div>
        </div>
    )
}
export default CaptainSignup