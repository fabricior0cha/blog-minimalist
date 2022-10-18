import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PostCard from '../../components/PostCard';
import TextInput from '../../components/TextInput'
import { Post } from '../../components/types';
import { useAxios } from '../../hooks/useAxios';
import { BASE_URL } from '../../utils/request';

function Search() {

    const [search, setSearch] = useState<string>('');
    const [data, error, request] =
    useAxios<Post[]>(
        {
            method: 'GET',
            url: BASE_URL+'/posts/filter?title='+search
        },
        false)
    
    useEffect(() => {
      request()
    }, [search])
    
 
    
    return (
        <Grid paddingY={5} paddingX={{ xs: 3, md: 20 }} minHeight={'100vh'} className='container' container>
            <Grid xs={12} mb={2} item>
                <TextInput
                    type="text"
                    name="search" id="search"
                    label='Enter search'
                    onChange={(e) => setSearch(e.target.value)}
                    value={search ? search : ""}
                    required={false}
                />
            </Grid>
            {data?.map((post) =>
                 (<Grid item xs={12}>
                   <PostCard post={post}/>
                 </Grid>
                 ))}
        </Grid>
    )
}

export default Search