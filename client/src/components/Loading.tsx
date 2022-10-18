import { Grid } from '@mui/material'
import React from 'react'

function Loading() {
  return (
    <Grid justifyContent={'center'} alignContent={'center'} minHeight={'100vh'} className='container' container>

    <div className="lds-facebook"><div></div><div></div><div></div></div>
    </Grid>
  
  )
}

export default Loading