import { Alert, AlertColor, Dialog, Grid, Snackbar } from '@mui/material'
import React, { FormEvent, useState } from 'react'
import './style.css'
import {Link, useNavigate} from 'react-router-dom'
import { Errors, Notification, Password, UserNew } from './types'
import TextInput from '../../components/TextInput'
import * as yup from 'yup'
import axios from 'axios'
import AlertNotification from '../../components/AlertNotification'
import { useLoading } from '../../hooks/useLoading'
import Loading from '../../components/Loading'
import { BASE_URL } from '../../utils/request'
function SignUp() {

    const [user, setUser] = useState<UserNew>({} as UserNew)
    
    const [password, setPassword] = useState<Password>({} as Password)
    const [errors, setErrors] = useState<Errors>({} as Errors)
    const [notification, setNotification] = useState<Notification>({} as Notification)
    const [disabled, setDisabled] = useState<boolean>(false)
    const [loading] = useLoading()
    const schemaName = yup.string().required('Please fill in this input')
    const schemaEmail = yup.string().required('Please fill in this input').email('Enter a valid email')
    const schemaPassword = yup.object({
        password: yup.string().required('Password is required').min(8, 'Password minimum 8 characters'),
        confirmPassword: yup.string()
           .oneOf([yup.ref('password'), null], 'Passwords must match')
      })
    

    const navigate = useNavigate();
      
    function createUser(e: FormEvent){
        e.preventDefault()
        setDisabled(true)
        if(
            errors.email ||
            errors.name || 
            errors.password || 
            errors.confirmPassword
            ){
            handleNotification('Please check your informations', 'warning')
            return
        }
        axios(
            {method: 'POST', url: BASE_URL+'/users', data: user}
        ).then((resp) =>{
            handleNotification('User created', 'success', '/login')
            setUser({} as UserNew)     
        })
        .catch((err) => {
            
            handleNotification(err.response.data.message, 'error')
        })
        
        
    }

    function handleNotification(message : string, type: string, location: string | null = null){
        setNotification({type: type, message: message, open: true})
        setTimeout(() => {
            setNotification({...notification,open: false})
            setDisabled(false)
            if(location) navigate(location)
        }, 3000)
        }
  return (
    <>
    {
            notification.open ? 
            <AlertNotification
            notification={notification}/> : <></>
    
    
        }
     
     
    {
        loading ? 
        <Loading/> 
        :
        <Grid className='container'  mt={0} container>
      
      <Grid  item display={{xs: 'none', sm: 'block'}} sm={3}>
          <div>
              <div className='side'>
                  <h1 className='side-title'>Sign Up</h1>
              </div>
          </div>
      </Grid>
      <Grid  
      height={'100vh'} 
      display="flex" 
      flexDirection="column"  
      justifyContent="center"  
      paddingX={{xs: 4, sm: 30}} 
      item xs={12} sm={9}>
          <h1 className='form-title'>Welcome</h1>
          <p className='form-desc'>Let's sign you up quickly</p>
          <form onSubmit={createUser}>
          <Grid container>
                  <Grid my={4} item xs={12}>
                      <TextInput 
                      type="text" 
                      name="name" 
                      id="name" 
                      label='Enter name'
                      required={true}
                      onBlur={(e : any) => {
                          schemaName.validate(e.target.value)
                          .then((resp) => {
                              setErrors({...errors, name: ''})
                          })
                          .catch((err) => {
                              setErrors({...errors, name: err.message})
                          })
                      }}
                      onChange={(e) => setUser({...user, name: e.target.value.replace(/\s\s+/g, '').trimStart()})} 
                       value={user.name ? user.name : ""}
                       error={errors.name ? true : false}
                       message={errors.name}/>
                  </Grid>
                  <Grid mb={4} item xs={12}>
                      <TextInput 
                      type="email" 
                      name="email" 
                      id="email" 
                      required={true}
                      label='Enter e-mail' 
                      onBlur={(e : any) => {
                          schemaEmail.validate(e.target.value)
                          .then((res) => {
                              setErrors({...errors, email: ''})
                          })
                          .catch((err) => {
                              setErrors({...errors, email: err.message})
                          })
                      }}
                      onChange={(e) => setUser({...user, email: e.target.value})} 
                      value={user.email ? user.email : ""}
                      error={errors.email ? true : false}
                      message={errors.email}
                      />
                  </Grid>
                  <Grid mb={4} item xs={12}>
                      <TextInput  
                      type="password" 
                      name="password" 
                      id="password" 
                      required={true}
                      label='Enter password' 
                      onBlur={(e : any) => {
                          schemaPassword.validate(password)
                          .then((res) => {
                              setErrors({...errors, password: ''})
                          })
                          .catch((err) => {
              
                              setErrors({...errors, password: err.message})
                          })
                      }}
                      onChange={(e) => {
                          setPassword({...password, password: e.target.value})
                      
                      }} 
                      value={password.password ? password.password : ""}
                      error={errors.password ? true : false}
                      message={errors.password}/>
                  </Grid>
                  <Grid mb={5} item xs={12}>
                      <TextInput   
                      required={true}
                      type="password" 
                      name="confirmPassword" 
                      id="confirmPassword" 
                      label='Confirm password'
                      onBlur={(e : any) => {
                          schemaPassword.validate(password)
                          .then((res) => {
                              setErrors({...errors, confirmPassword: ''})
                              setUser({...user, password: e.target.value.trim()})
                          })
                          .catch((err) => {
              
                              setErrors({...errors, confirmPassword: err.message})
                          })
                      }}
                      onChange={(e) => {
                          setPassword({...password, confirmPassword: e.target.value})
                      }} 
                      value={password.confirmPassword ? password.confirmPassword : ""}
                      error={errors.confirmPassword ? true : false}
                      message={errors.confirmPassword}/>
                  </Grid> 
                  <Grid item xs={12} sm={3}>
                      <button disabled={disabled} className='form-button' type="submit">SUBMIT</button>
                  </Grid>
                  <Grid item xs={0} sm={4}></Grid>
                  <Grid item xs={12} sm={5}>
                      <p className='text-form'>already have an account?</p>
                      <Link className='link' to={'/login'}><a className='link' href='#'>log-in</a></Link>
                  </Grid>
              </Grid>
          </form>
            
        
      </Grid>
  </Grid>}
    </>
   
  )
}

export default SignUp