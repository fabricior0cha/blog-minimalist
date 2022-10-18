import { Grid } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AlertNotification from '../../components/AlertNotification'
import Loading from '../../components/Loading'
import { Notification } from '../../components/types'
import { useLoading } from '../../hooks/useLoading'
import { BASE_URL } from '../../utils/request'
import './style.css'
import { Author, IPost } from './type'

interface Props {
  user: Author
}

function Post({user} : Props) {

    const [post, setPost] = useState<IPost>({} as IPost)
    const [notification, setNotification] = useState<Notification>({} as Notification)
    const [loading] = useLoading()
    const {id} = useParams()
    useEffect(() => {
      
      axios({method: 'GET', url: BASE_URL+'/posts/'+id}).then((resp) => {
        setPost(resp.data)
      })
      .catch((err) => {
        handleNotification(err.response.data.message, 'error')
      })
    }, [])
    
    function likePost(id ?: string){
      axios(
        {method: 'POST',
        url: BASE_URL+'/posts/like/'+id,
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token'), 
      'Access-Control-Allow-Origin' : '*'}}
      ).then((resp) => 
      axios({method: 'GET', url: BASE_URL+'/posts/'+id}).then((resp) => {
        setPost(resp.data)
      })
      .catch((err) => {
        handleNotification(err.message, 'error')
      })).catch((err) => 
      handleNotification(err.message, 'error'))
    }

    function handleNotification(message : string, type: string){
      setNotification({type: type, message: message, open: true})
      setTimeout(() => {
          setNotification({...notification,open: false})
         
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
            post.id ? <Grid paddingY={5} paddingX={{xs: 3, md:20}} minHeight={'100vh'} className='container' container>
            <Grid item xs={12}>
                <h2 className='post-title'>{post.title}</h2>
                <div className='infos'>
                  <div>
                  <p className='principal-info'>written by @{post.author?.name}</p>
                    <p className='principal-info'>27 May</p>
                    
                  </div>
                  
                  {
                    user.id ?
                    post.likes.includes(user.id) ? <button disabled={true} className='like-button' type="button">LIKED</button> :
                    <button onClick={() => likePost(post.id)} className='like-button' type="button">LIKE</button> :
                    <></>
                  }
                 
                </div>
                
                <pre className='text'>{post.content}
                </pre>
            </Grid>
        </Grid> :
      
        <Grid paddingY={5} paddingX={{xs: 3, md:20}} minHeight={'100vh'} className='container' container><h2 className='post-title'>Post not found :(</h2></Grid>
        }
      </>
        
        
    )
}

export default Post