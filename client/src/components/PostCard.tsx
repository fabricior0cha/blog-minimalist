import { Grid } from '@mui/material'
import React from 'react'
import { convertDate } from '../helpers/helpers'
import { Post } from './types'
import FavoriteIcon from './../assets/img/favorite.svg'
import { Link } from 'react-router-dom'
interface Props {
    post : Post
}
function PostCard({post} : Props) {
    return (
        <Grid mb={5} container alignItems={"center"}>
            <Grid display={{ xs: 'none', sm: 'block' }} item xs={2}>
                <div className='info'>
                    <h2 className='info-date'>{convertDate(new Date(post.date))}</h2>
                    <div className='info-like'>
                        <img src={FavoriteIcon} />
                        <span className='info-likes'>{post?.likes?.length}</span>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} md={10}>
                <h2 className='post-title'>{post.title}</h2>
                <div className='post-like'>
                    <img src={FavoriteIcon} />
                    <span className='info-likes'>{post?.likes?.length}</span>
                </div>
                <div className='post-infos'>
                    <p className='post-user'>by @{post?.author?.name}</p>
                    <p className='post-date'>{convertDate(new Date(post.date))}</p>

                </div>
                <div className='post-container-text'>
                    <p className='post-text'>{`${post?.content?.slice(0,80)}`}
                        <Link to={`/post/${post?.id}`}>
                            <a className='post-link' >...read more</a>
                        </Link></p>
                </div>


                <div className='post-tags-home'>
                    {post?.tags?.map(tag => (
                        <span className='post-tag-home'>#{tag}</span>
                    ))}
                </div>
            </Grid>
            <Grid item xs={12}>
                <hr className='divider'/>
            </Grid>
        </Grid>
    )
}

export default PostCard