import React from 'react'
import { ClimbingBoxLoader, FadeLoader, GridLoader, MoonLoader, PacmanLoader, PulseLoader, RingLoader } from "react-spinners";

const Loader = ({loading}) => {
  return (
    <div className='w-screen h-screen flex justify-center items-center space-y-5 flex-col'>
      <GridLoader loading={loading}
      size={100}
      color='#B33791'
      margin={2}
      />
      {/* <p className='text-3xl text-[#B33791] font-semibold'>Loading...</p> */}
    </div>
  )
}

export default Loader
