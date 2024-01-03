import React from 'react'

function Card5({h1, p, img}) {
  return (
    <div>
     <img src={img} className=" block  m-[auto]" />
      <h1 className='text-[rgba(17,120,178,0.5)] font-[800] text-[40px]'>{h1}</h1>
      <p>{p}</p>
    </div>
  )
}

export default Card5
