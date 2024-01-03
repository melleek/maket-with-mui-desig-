import { Typography } from '@mui/material'
import React from 'react'

function Card1({ h1, h2, h3}) {
    return (
        <div className='card1 flex flex-col items-center px-[21px] py-[42px] gap-[10px]'>
            <Typography sx={{ color: "rgba(17, 120, 178, 0.50)", fontSize: "60px", fontWeight: "800" }}>{h1}</Typography>
            <Typography sx={{fontWeight: "800"}}>{h2}</Typography>
            <Typography sx={{textAlign: "center"}}>{h3}</Typography>
        </div>
    )
}

export default Card1
