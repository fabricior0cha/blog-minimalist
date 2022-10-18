import { Grid } from '@mui/material'
import React, { FormEvent, FormEventHandler, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TextInput from '../../components/TextInput';
import { useAxios } from '../../hooks/useAxios';
import { User } from '../Home/type';
import './style.css'
import { Errors, Post } from './types';
import * as yup from 'yup'
import TextAreaInput from '../../components/TextAreaInput';
import axios from 'axios';
import { Notification } from '../../components/types';
import AlertNotification from '../../components/AlertNotification';
import { useLoading } from '../../hooks/useLoading';
import Loading from '../../components/Loading';
import { BASE_URL } from '../../utils/request';

interface Props {
    author: User
}

function CreatePost(props: Props) {

    const [post, setPost] = useState<Post>({} as Post)
    const [errors, setErrors] = useState<Errors>({} as Errors)
    const [disabled, setDisabled] = useState<boolean>(false);
    const [notification, setNotification] = useState<Notification>({} as Notification)
    const [loading] = useLoading()

    const navigate = useNavigate()

    const schemaTitle = yup.string().required('Please fill in this input').min(10, 'Minimum size 10 characters').max(50, 'Maximum size 50 characters')
    const schemaContent = yup.string().required('Please fill in this input').min(20, 'Minimum size 20 characters').max(450, 'Maximum size 450 characters')


    useEffect(() => {
        if (!props.author.id) {
            navigate('/')
            return
        }
        setPost({ ...post, author: props.author })

    }, [])


    function handleAddTag(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key !== 'Enter') return;
        setPost({ ...post, tags: [...(post.tags != undefined ? post.tags : []), e.currentTarget.value] })
        e.currentTarget.value = '';
    }

    function removeTag(index: number) {
        setPost({ ...post, tags: post.tags?.filter((el, i) => i !== index) })

    }

    function createPost() {
        if(errors.content != '' && errors.content != '') {
            handleNotification('Please fill the form correctly', 'error')
            return
        }
        setDisabled(true)
        axios({
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            url: BASE_URL+'/posts',
            data: post
        }).then((resp) => {
            handleNotification('Success', 'success', '/')

        })
            .catch((err) => {
                handleNotification(err.message, 'error')
            })
    }

    function handleNotification(message: string, type: string, location: string | null = null) {
        setNotification({ type: type, message: message, open: true })
        setTimeout(() => {
            setNotification({ ...notification, open: false })
            setDisabled(false)
            if (location) navigate(location)
        }, 3000)
    }



    return (
        <>
            {
                notification.open ?
                    <AlertNotification
                        notification={notification} /> : <></>


            }
            {
                loading ? <Loading />
                    :
                    <Grid justifyContent="center" className='container' container>
                        <Grid height={'100vh'} display="flex" flexDirection="column" justifyContent="center" paddingX={{ xs: 4, sm: 30 }} item xs={12} sm={9}>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <Grid container>

                                    <Grid my={2} item xs={12}>
                                        <TextInput
                                            type="text"
                                            name="title"
                                            id="title"
                                            label='Enter post title'
                                            required={true}
                                            onBlur={(e: any) => {
                                                schemaTitle.validate(e.target.value)
                                                    .then((resp) => {
                                                        setErrors({ ...errors, title: '' })
                                                    })
                                                    .catch((err) => {
                                                        setErrors({ ...errors, title: err.message })
                                                    })
                                            }}
                                            value={post.title ? post.title : ''}
                                            onChange={e => {
                                                setPost({ ...post, title: e.target.value.trimStart() })
                                            }}
                                            error={errors.title ? true : false}
                                            message={errors.title} />
                                    </Grid>

                                    <Grid my={2} item xs={12}>
                                        <TextAreaInput
                                            name="content"
                                            id="content"
                                            required={true}
                                            onBlur={(e: any) => {
                                                schemaContent.validate(e.target.value)
                                                    .then((resp) => {
                                                        setErrors({ ...errors, content: '' })
                                                    })
                                                    .catch((err) => {
                                                        setErrors({ ...errors, content: err.message })
                                                    })
                                            }}
                                            label='Enter post content'
                                            maxLength={450}
                                            value={post.content ? post.content : ''} onChange={e => {
                                                setPost({ ...post, content: e.target.value })
                                            }}
                                            error={errors.content ? true : false}
                                            message={errors.content} />
                                    </Grid>

                                    <Grid my={2} item xs={12}>
                                        <div className='tags'>
                                            {post.tags?.map((tag: String, index: number) => (
                                                <div className='tag'>
                                                    <span className='post-tag'>
                                                        #{tag}

                                                    </span>
                                                    <span onClick={() => { removeTag(index) }} className="close">&times;</span>
                                                </div>
                                            ))}

                                            <input className='input-tags' type="text" name="tags" id="tags" placeholder='Enter tags' maxLength={15} onKeyDown={handleAddTag} />
                                        </div>

                                    </Grid>



                                    <Grid my={2} item xs={12} sm={3}>
                                        <button onClick={() => createPost()} disabled={disabled} className='form-button'  type="button">SUBMIT</button>
                                    </Grid>
                                </Grid>
                            </form>


                        </Grid>
                    </Grid>}

        </>


    )
}

export default CreatePost