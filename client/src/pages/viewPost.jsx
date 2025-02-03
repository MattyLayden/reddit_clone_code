import React from 'react'


import ViewPostMainInfo from '../react_components/postViewPostInfo.jsx'
import ViewPostComments from '../react_components/postViewCommentInfo.jsx'

import '../css/post-view.css'

import Divider from '@mui/material/Divider';


import { useAuth } from '../context/userContext.js'


import { useParams } from 'react-router-dom';



export default function ViewPost(){

    const {postId} = useParams()

    const parsedPostId = parseInt(postId)

    const userInfo = useAuth();

    
   

    return(

        <div className='post-container'>

            <ViewPostMainInfo userInfo = {userInfo} parsedId={parsedPostId}/>

                <Divider variant="middle" component="li" />

            <ViewPostComments userInfo = {userInfo} parsedId = {parsedPostId} />
        

        </div>
    )
    
}