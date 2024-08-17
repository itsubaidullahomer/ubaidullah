import React from 'react'

function UpGlobalLoader() {
  return (
    <div className="flex items-center justify-center fixed inset-0 z-[9999]  bg-[#011627]">
      <img   className='rounded-[12px] h-[320px]' src="./loader.gif"></img>
    </div>
  )
}

export default UpGlobalLoader