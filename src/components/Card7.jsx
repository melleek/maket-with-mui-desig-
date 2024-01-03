import React from 'react'

function Card7({img, h1}) {
  return (
    <div className='w-[393px] shadow-[0px,0px,30px,0px,rgba(0, 0, 0, 0.09)]'>
        <img src={img} alt="" />
        <h1>{h1}</h1>
    </div>
  )
}

export default Card7
