import React from 'react'

function ComingSoon() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-[80vh]'>
      {/* <video 
        src="/assets/Coming soon.mp4" 
        className="w-100 object-cover"
        autoPlay 
        loop 
        muted 
        playsInline
        disablePictureInPicture
        controls={false}       
        /> */}
        <img src="/assets/Coming soon.png" className="w-90 object-cover" alt="" />

        <p className="text-4xl font-semibold mt-10 text-gray-500">Coming Soon...</p>
    </div>
  )
}

export default ComingSoon
