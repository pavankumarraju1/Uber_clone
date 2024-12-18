import React from 'react'

const LocationsShowPanel = (props) => {
    const locations = [
        "24B, Near Kapoor's cafe, Sheryians Coding School, Bhopal",
        "22C, Near Malholtra's cafe, Sheryians Coding School, Bhopal",
        "20B, Near Singhai's cafe, Sheryians Coding School, Bhopal",
        "18A, Near Sharma's cafe, Sheryians Coding School, Bhopal",
    ]
  return (
    <>
        {
            locations.map((val,idx)=>{
                return(
                    <div key={idx} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl my-3 justify-start bg-gray-200' onClick={() => {
                        props.setVehicalpanel(true)
                        props.setPicdespanel(false)
                    }}>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h2 className='font-medium'>{val}</h2>
                    </div>
                )
            })
        }
    </>
  )
}

export default LocationsShowPanel