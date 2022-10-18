import { Alert, AlertColor, Grid, Snackbar } from '@mui/material'
import React, { FormEvent, useState } from 'react'
import './style.css'
import { useNavigate, Link } from 'react-router-dom'
import { Notification, UserLogin } from './types';
import { useAxios } from '../../hooks/useAxios';
import TextInput from '../../components/TextInput';
import axios from 'axios';
import AlertNotification from '../../components/AlertNotification';
import { useLoading } from '../../hooks/useLoading';
import Loading from '../../components/Loading';
import { BASE_URL } from '../../utils/request';
function Login() {

    const navigate = useNavigate();
    const [notification, setNotification] = useState<Notification>({} as Notification)
    const [user, setUser] = useState<UserLogin>({} as UserLogin)
    const [disabled, setDisabled] = useState<boolean>(false)
    const [loading] = useLoading()
    


   

    function handleLogin(e: FormEvent) {
        e.preventDefault()
        setDisabled(true)
        axios(
            { method: 'POST', 
            url: BASE_URL+'/login', 
            data: user }
        ).then((resp) =>{
            localStorage.setItem('token', resp.data)
            handleNotification('Login sucess', 'success', '/')
            
        })
        .catch((err) => {
            let message = err.response.status === 403 ? 'Please check your credentials' : 'Something is wrong...'
            handleNotification(message, 'error')
        })
        
        
    }

    function handleNotification(message : string, type: string, location: string | null = null){
        setNotification({type: type, message: message, open: true})
        setTimeout(() => {
            setNotification({...notification,open: false})
            setDisabled(false)
            navigate('/')
        }, 3000)
        }
        
    return (
      <>
       {
            notification.open ? 
            <AlertNotification
            notification={notification}/> : <></>
    
    
        }

         { loading ? 
         <Loading/> 
         :
            <Grid className='container' mt={0} container>
            <Grid item display={{ xs: 'none', sm: 'block' }} sm={3}>
                <div>
                    <div className='side'>
                        <h1 className='side-title'>Login</h1>
                    </div>
                </div>
            </Grid>
            <Grid height={'100vh'} display="flex" flexDirection="column" justifyContent="center" paddingX={{ xs: 4, sm: 30 }} item xs={12} sm={9}>
                <h1 className='form-title'>Welcome</h1>
                <p className='form-desc'>Let’s log you in quickly</p>

                <form onSubmit={handleLogin} >
                    <Grid container>

                        <Grid my={4} item xs={12}> 
                            <TextInput
                                type="email"
                                name="email" id="email"
                                label='Enter your e-mail'
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                value={user.email ? user.email : ""}
                                required={true}
                            />
                        </Grid>
                        <Grid mb={4} item xs={12}>
                            <TextInput 
                            type="password" 
                            name="password" 
                            id="password" 
                            label='Enter your password'
                            required={true}
                            onChange={(e) => setUser({ ...user, password: e.target.value.trim() })}
                            value={user.password ? user.password : ""} />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <button disabled={disabled} className='form-button' type="submit">LOGIN</button>
                        </Grid>

                        <Grid item xs={0} sm={4}></Grid>
                        <Grid item xs={12} sm={5}>
                            <p className='text-login'>don’t have an account?</p>
                            <Link className='link' to={'/signup'}><a className='link'>sign-up</a></Link>
                        </Grid>
                    </Grid>

                </form>

            </Grid>
        </Grid>}
      </>
         
       
    )
}

export default Login