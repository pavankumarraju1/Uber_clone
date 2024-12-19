import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'


import LocationsShowPanel from '../components/LocationsShowPanel'
import VehiclesListPanel from '../components/VehiclesListPanel'
import ConfirmedVehiclePanel from '../components/ConfirmedVehiclePanel'
import WaitingForDriverAcceptRidePanel from '../components/WaitingForDriverAcceptRidePanel'
import ShowingDriverDetailsAfterAccept from '../components/ShowingDriverDetailsAfterAccept'
import { Link } from 'react-router-dom'


const Home = () => {

  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [picdespanel, setPicdespanel] = useState(false)

  const locationPanelRef = useRef(null);
  const dowmArrow = useRef(null)

  const [vehicalPanel, setVehicalpanel] = useState(false)
  const vehicalPanelref = useRef(null)

  const [confirmVehiclePanel, setconfirmVehiclePanel] = useState(false);
  const confirmVehiclePanelref = useRef(null)

  const [WaitingForDriverAccept, setWaitingForDriverAccept] = useState(false)
  const WaitingForDriverAcceptref = useRef(null)

  const [showingDetailsAfterDriverAccept, setShowingDetailsAfterDriverAccept] = useState(false)
  const showingDetailsAfterDriverAcceptref = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault();
  }

  // pickup ans destination panel animation
  useGSAP(() => {
    if (picdespanel) {
      gsap.to(locationPanelRef.current, {
        height: '70%',
        padding: 25
      })
      gsap.to(dowmArrow.current, {
        opacity: 1
      })
    }
    else {
      gsap.to(locationPanelRef.current, {
        height: '0%',
        padding: 0

      })
      gsap.to(dowmArrow.current, {
        opacity: 0
      })
    }
  }, [picdespanel])


  // vehicle panel open animation
  useGSAP(() => {
    if (vehicalPanel) {
      gsap.to(vehicalPanelref.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(vehicalPanelref.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicalPanel])


  // confirm vehical panel open animation
  useGSAP(() => {
    if (confirmVehiclePanel) {
      gsap.to(confirmVehiclePanelref.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(confirmVehiclePanelref.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmVehiclePanel])


  //after clicking any one of the vehicle waiting for driver acceptace panel
  useGSAP(() => {
    if (WaitingForDriverAccept) {
      gsap.to(WaitingForDriverAcceptref.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(WaitingForDriverAcceptref.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [WaitingForDriverAccept])


  //showing driver details after driver got accepted ypur ride animation
  useGSAP(() => {
    if (showingDetailsAfterDriverAccept) {
      gsap.to(showingDetailsAfterDriverAcceptref.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(showingDetailsAfterDriverAcceptref.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [showingDetailsAfterDriverAccept])


  return (
    <div className='h-screen relative'>
      <img className='w-16 absolute left-10 top-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        
    
      {/* image  */}
      <div className='h-screen w-full'>
        {/* image for temporary use  */}
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        
      </div>

      {/* picup destination and location showing panel */}
      <div className='absolute top-0 h-screen w-full flex flex-col justify-end overflow-hidden'>
        <Link to='/user/logout' className='absolute top-6 right-5 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
        {/* picup and destination panel div */}
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 className='absolute right-5 top-4 opacity-0'
            onClick={() => setPicdespanel(false)}
            ref={dowmArrow}>
            <i className="ri-arrow-down-double-line text-3xl"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={submitHandler}>
            {/* <div className='absolute h-16 w-1 bottom-8 left-[4%] rounded bg-black'></div> */}
            <input className='bg-[#eee] text-lg px-5 py-2 rounded-lg w-full mt-3 border border-black' type='text' value={pickup}
              placeholder='add pickup location'
              onChange={(e => {
                setPickup(e.target.value)
              })}
              onClick={() => {
                setPicdespanel(true)
              }}></input>
            <input className='bg-[#eee] text-lg  px-5 py-2 rounded-lg w-full mt-3 border border-black' type='text' value={destination}
              placeholder='add destination location'
              onChange={(e => {
                setDestination(e.target.value)
              })}
              onClick={() => {
                setPicdespanel(true)
              }}></input>
          </form>
        </div>

        {/* loations showing panel */}
        <div className='bg-white h-0' ref={locationPanelRef}>
          <LocationsShowPanel setVehicalpanel={setVehicalpanel} setPicdespanel={setPicdespanel} />
        </div>
      </div>


      {/* Showing vehicles list */}
      <div ref={vehicalPanelref} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-5 pt-12'>
        <VehiclesListPanel setVehicalpanel={setVehicalpanel} setconfirmVehiclePanel={setconfirmVehiclePanel} />
      </div>

      {/* after clicking a vehicle showing vehicle details and address info */}
      <div className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-5 pt-12'
        ref={confirmVehiclePanelref}>
        <ConfirmedVehiclePanel setconfirmVehiclePanel={setconfirmVehiclePanel} setWaitingForDriverAccept={setWaitingForDriverAccept}
          setVehicalpanel={setVehicalpanel}
        />
      </div>

      {/* After confirming vehicle looking for driver */}
      <div ref={WaitingForDriverAcceptref} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <WaitingForDriverAcceptRidePanel setWaitingForDriverAccept={setWaitingForDriverAccept}
          setShowingDetailsAfterDriverAccept={setShowingDetailsAfterDriverAccept}
        />
      </div>


      <div ref={showingDetailsAfterDriverAcceptref} className='fixed w-full translate-y-full z-10 bottom-0  bg-white px-3 py-6 pt-12'>
        <ShowingDriverDetailsAfterAccept setShowingDetailsAfterDriverAccept={setShowingDetailsAfterDriverAccept}
          setWaitingForDriverAccept={setWaitingForDriverAccept}
        />
      </div>
    </div>
  )
}

export default Home