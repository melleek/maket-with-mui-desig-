import React from 'react'

function Card3({img, h1, p}) {
  return (
    <div className='flex flex-col items-center gap-[5px] w-[230px]'>
      <img src={img} alt="" />
      <h1 className='font-[800]'>{h1}</h1>
      <p className='text-[14px]'>{p}</p>
    </div>
  )
}

export default Card3
