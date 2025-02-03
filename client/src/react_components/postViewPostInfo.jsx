

//main post info object
//{title: x, dateAdded: x, postInformation: x, fileUrl: x, articleLink: x, upvotes: x, subreddit:{name: x, icon: y}, author:{username: x}, _count:{comments: 12} whenAdded: x

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';


import React, {useState, useEffect} from 'react'

import { useNavigate } from 'react-router-dom';


import axios from 'axios'

export default function ViewPostMainInfo({ userInfo, parsedId }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [postInfo, setPostInfo] = useState('');
    const [upvotes, setUpvotes] = useState(0);
    const [hasUpvoted, setHasUpvoted] = useState(false);
    const [hasDownvoted, setHasDownvoted] = useState(false);

    const navigate = useNavigate();

    const handleLoginClick = () => {
        setOpenDialog(false)
        navigate('/login')
    }

    function onImageClickArticle(link) {
        if (link) {
            window.location.href = link;
        } else {
            console.log('No link found');
        }
    }

    async function onUpvoteClick() {
        if (!userInfo.isAuthenticated) {
            setOpenDialog(true)
            return;
        }

        if (hasUpvoted) {
            
            setUpvotes(prevUpvotes => prevUpvotes - 1);
            setHasUpvoted(false);
        } else if (hasDownvoted) {
        
            setUpvotes(prevUpvotes => prevUpvotes + 2);
            setHasUpvoted(true);
            setHasDownvoted(false);
        } else {
        
            setUpvotes(prevUpvotes => prevUpvotes + 1);
            setHasUpvoted(true);
        }
    }

    async function onDownvoteClick() {
        if (!userInfo.isAuthenticated) {
            setOpenDialog(true)
            return;
        }

        if (hasDownvoted) {
            setUpvotes(prevUpvotes => prevUpvotes + 1);
            setHasDownvoted(false);
        } else if (hasUpvoted) {
            setUpvotes(prevUpvotes => prevUpvotes - 2);
            setHasUpvoted(false);
            setHasDownvoted(true);
        } else {
            setUpvotes(prevUpvotes => prevUpvotes - 1);
            setHasDownvoted(true);
        }
    }

    useEffect(() => {
        async function getPostInfo() {
            try {
                const response = await axios.get(`/api/posts/singlepostview/postinfo/${parsedId}`);
                if (response.status === 200) {
                    setPostInfo(response.data);
                    setUpvotes(response.data.upvotes);
                } else if (response.status === 404) {
                    console.log('Post not found');
                } else {
                    console.log('Unknown error');
                }
            } catch (error) {
                console.log(`Error: ${error}`);
            }
        }

        getPostInfo();
    }, []);

    useEffect(() => {
        const saveVoteState = () => {
            
            if(hasUpvoted || hasDownvoted){

                axios.post('/api/posts/singlepostview/vote', {
                    postId: parsedId,
                    hasUpvoted,
                    hasDownvoted
                }).catch(error => console.error('Failed to save vote:', error));
            }else{
                console.log('Neither upvote or downvote has been clicked, not updating server via rest API.')
            }
           
        };
    
    
        window.addEventListener('beforeunload', saveVoteState);
    
        // Cleanup
        return () => window.removeEventListener('beforeunload', saveVoteState);
    }, [hasUpvoted, hasDownvoted, postInfo.id]);


    function handleUserClick(username){
        if(username){
            navigate(`/user/${username}`)
        }
    }
    
    function handleSubredditClick(subreddit){
        if(subreddit){
            navigate(`/subreddit/${subreddit}`)
        }
    }
    
    const title = postInfo.title ? postInfo.title.replace(/`/g, "'") : '';
    const bodyText = postInfo.postInformation ? postInfo.postInformation.replace(/`/g, "'") : '';

    return (
        <>
            <div className="postInfoContainer">
                <div id="topbar">
                    <img id="subreddit-icon" onClick={() => handleSubredditClick(postInfo.subreddit?.name)} src={postInfo.subreddit?.icon} alt="Subreddit Icon" />
                    <div id="subredditAndUsername">
                        <p id="subredditName" onClick={() => handleSubredditClick(postInfo.subreddit?.name)}>r/{postInfo.subreddit?.name} - {postInfo.whenAdded}</p>
                        <p id="userName" onClick={() => handleUserClick(postInfo.author?.username)}>{postInfo.author?.username}</p>
                    </div>
                    
                </div>

                <p id="title">{title}</p>
                <p id="body-text">{bodyText}</p>

                {postInfo.fileUrl ? (
                    postInfo.articleLink ? (
                        
                        <img
                            id="imagePlusLink"
                            src={postInfo.fileUrl}
                            alt="Post Content"
                            onClick={() => onImageClickArticle(postInfo.articleLink)}
                        />
                    ) : (
                        
                        <img id="imageMinusLink" src={postInfo.fileUrl} alt="Post Content" />
                    )
                ) : null }

                <div id="stats-bar">
                    <div id="upvotes">
                        <ArrowUpwardIcon
                            id={hasUpvoted ? 'upvoted' : 'upvote'}
                            onClick={onUpvoteClick}
                            fontSize='large'
                        />
                        <p id="upvote-number">{upvotes}</p>
                        <ArrowDownwardIcon
                            id={hasDownvoted ? 'downvoted' : 'downvote'}
                            onClick={onDownvoteClick}
                            fontSize='large'
                        />
                    </div>

                    <div id="comments">
                        <ChatBubbleIcon id="commentBubble" fontSize='large' />
                        <p id="commentCount">{postInfo._count?.comments}</p>
                    </div>
                </div>

                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>You need to log in.</DialogTitle>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLoginClick}
                    >
                                Log In
                            </Button>

                            <Button
                            variant='conatined'
                            color='primary'
                            onClick={() => setOpenDialog(false)}>
                                Back
                            </Button>
                        </DialogActions>
                    </Dialog>

                
            </div>
        </>
    );
}
