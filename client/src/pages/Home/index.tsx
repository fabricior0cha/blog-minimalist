import { Grid } from '@mui/material'
import { convertDate } from '../../helpers/helpers'
import { useAxios } from '../../hooks/useAxios'
import { Post } from '../CreatePost/types'
import AddIcon from './../../assets/img/add.svg'
import SearchIcon from './../../assets/img/search.svg'
import LoginIcon from './../../assets/img/login.svg'
import LogoutIcon from './../../assets/img/logout.svg'
import FavoriteIcon from './../../assets/img/favorite.svg'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { User } from './type'
import PostCard from '../../components/PostCard'
import { Notification } from '../../components/types'
import AlertNotification from '../../components/AlertNotification'
import { useLoading } from '../../hooks/useLoading'
import Loading from '../../components/Loading'
import { BASE_URL } from '../../utils/request'

interface Props {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>
}

function Home(props: Props) {


   
    const [notification, setNotification] = useState<Notification>({} as Notification)
    const [loading] = useLoading()
    const navigate = useNavigate()
    const [data, error, request] =
    useAxios<Post[]>(
        {
            method: 'GET',
            url: BASE_URL+'/posts'
        },
        true)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            axios({
                method: 'GET',
                url: BASE_URL+'/users/me',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            })
                .then((resp) => {
                    props.setUser(resp.data)
                })
                .catch((err) => {
                    handleNotification(err.message, 'error')
                })
        }


    }, [])

    function handleNotification(message : string, type: string ){
        setNotification({type: type, message: message, open: true})
        setTimeout(() => {
            setNotification({...notification,open: false})
            
        }, 3000)
        }


    

    function handleLogout(e: any) {
        localStorage.removeItem('token')
        props.setUser({} as User)
        navigate('/')
    }


    return (
        <>
        {
            notification.open ? 
            <AlertNotification
            notification={notification}/> : <></>
    
    
        }
       { loading ? <Loading/>
       :
         <Grid className='container' container>
         <Grid className='sidebar' item display={{ xs: 'none', md: 'block' }} md={1}>
             <Grid mt={3} alignItems={'center'} justifyContent={'center'} direction={'column'} container>
                 <Grid my={3} item>
                     <div className='profile'>
                         <p className='profile-name'>{props.user.name ? props.user.name?.charAt(0).toUpperCase() : 'S'}</p>
                     </div>
                 </Grid>
                 <Grid mb={3} item>
                     <Link to={'/search'}>
                         <a className='sidebar-link' href="#">
                             <img className='sidebar-img' src={SearchIcon} />
                             <span className='sidebar-text'>search</span>
                         </a>
                     </Link>
                 </Grid>
                 <Grid mb={15} item>
                     {
                         !props.user.id ? <Link to={'/login'}>
                             <a className='sidebar-link' href="#">
                                 <img className='sidebar-img' src={LoginIcon} />
                                 <span className='sidebar-text'>login</span>
                             </a>
                         </Link> :
                             <a onClick={handleLogout} className='sidebar-link' href="#">
                                 <img className='sidebar-img' src={LogoutIcon} />
                                 <span className='sidebar-text'>logout</span>
                             </a>
                     }

                 </Grid>
                 <Grid item>
                     {
                        props.user.id ? 
                        <Link to={'/new'}>
                         <a className='sidebar-link' href="#">
                             <img className='sidebar-img' src={AddIcon} />
                             <span className='sidebar-text'>create</span>
                         </a>
                     </Link>: <></>
                     }
                 </Grid>
             </Grid>
         </Grid>
         <Grid marginLeft={{ xs: 0, md: 5 }} padding={{ xs: 3, md: 10 }} item xs={12} md={11}>
             <Grid minHeight={'100vh'} container>
                 <Grid item xs={12} md={2}>
                     <div className='latest'>
                         <div className='latest-bar'></div>
                         <h2 className='latest-text'>Latest</h2>
                     </div>
                 </Grid>
                 {data?.map((post) =>
                 (<Grid item xs={12}>
                   <PostCard post={post}/>
                 </Grid>
                 ))}

                

             </Grid>

         </Grid>
         <Grid pt={10} display={{ xs: 'block', md: 'none' }} item xs={12}>
             <div className='mobile-menu'>
                 <div className='profile'>
                     <p className='profile-name'>{props.user.name ? props.user.name?.charAt(0).toUpperCase() : 'S'}</p>
                 </div>
                 <Link to={'/search'}>
                     <a className='sidebar-link' href="#">
                         <img className='sidebar-img' src={SearchIcon} />

                     </a>
                 </Link>
                {
                    props.user.id ? 
                    <Link to={'/new'}>
                    <a className='sidebar-link' href="#">
                        <img className='sidebar-img' src={AddIcon} />

                    </a>
                </Link>
                : <></>
                }
                   {
                     !props.user.id ? 
                     <Link to='/login'>
                      <a className='sidebar-link' href="#">
                     <img className='sidebar-img' src={LoginIcon} />

                     </a>
                     </Link>
                     : 
                     <a onClick={handleLogout} className='sidebar-link' href="#">
                     <img className='sidebar-img' src={LogoutIcon} />

                     </a>
                   }                  
                
             </div>

         </Grid>
     </Grid>
       }
        </>
    )
}

export default Home