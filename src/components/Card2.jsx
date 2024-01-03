import React from 'react'

function Card2({img, h1}) {
  return (
    <div className='w-[392px] div1 flex flex-col items-center gap-[20px] py-[70px] text-[20px] font-[800]'>
      <img src={img} alt="" />
      <h1>{h1}</h1>
    </div>
  )
}

export default Card2
