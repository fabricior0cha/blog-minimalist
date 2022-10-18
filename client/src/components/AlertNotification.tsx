import { Alert, AlertColor, Snackbar } from '@mui/material'
import React from 'react'
import { Notification } from './types'

interface Props{
    notification: Notification
}

function AlertNotification({notification} : Props) {
  return (
    <Snackbar
            open={true}
            anchorOrigin={ {vertical: 'top', horizontal: 'right'} }
             >
                <Alert  variant="filled" 
                
                severity={notification.type as AlertColor}>
                {notification.message}
                </Alert>
              </Snackbar>
  )
}

export default AlertNotification