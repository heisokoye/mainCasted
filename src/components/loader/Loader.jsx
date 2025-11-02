import React from 'react'

const Loader = () => {
  return (    
    <div className="flex justify-center z-50 items-center">
        <div className="animate-spin rounded-full h-5 w-5  border-b-2 border-black"></div>
    </div>
  )
}

export default Loader