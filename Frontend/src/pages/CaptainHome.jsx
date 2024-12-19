import React, { useRef,useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import CaptainDetails from '../components/captainComponents/CaptainDetails'
import RidePopUp from '../components/captainComponents/RidePopUp'
import ShowingUserDetailsAfterConfirm from '../components/captainComponents/ShowingUserDetailsAfterConfirm'

const CaptainHome = () => {

  const[ridepopup,setridepopup] = useState(true)
  const ridepopupref = useRef(null);

  const [showingDetailsofuserotppanel, setShowingDetailsofuserotppanel] = useState(false)
  const showingDetailsofuserotppanelref = useRef(null);


  // ride pop up panel animation
  useGSAP(()=>{
    if (ridepopup){
      gsap.to(ridepopupref.current,{
        transform:'translateY(0%)'
      })
    }
    else{
      gsap.to(ridepopupref.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridepopup])
  

  // showing details of user to confirm otp panel
  useGSAP(() => {
    if (showingDetailsofuserotppanel) {
      gsap.to(showingDetailsofuserotppanelref.current, {
        transform: 'translateY(0%)'
      })
    }
    else {
      gsap.to(showingDetailsofuserotppanelref.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [showingDetailsofuserotppanel])



  return (
    <div className='h-screen'>

      {/* image and upper part of captain home */}
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/captain/logout' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>

      {/* Captain details and stats */}
      <div className='h-2/5 p-6'>
        <CaptainDetails />
      </div>

      {/* ride pop up and ride from user */}
      <div ref={ridepopupref} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12'>
        <RidePopUp setridepopup={setridepopup}
          setShowingDetailsofuserotppanel={setShowingDetailsofuserotppanel}
          />
      </div>
      
      <div ref={showingDetailsofuserotppanelref} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <ShowingUserDetailsAfterConfirm setridepopup={setridepopup} setShowingDetailsofuserotppanel={setShowingDetailsofuserotppanel}/>
      </div>

    </div>
  )
}

export default CaptainHome