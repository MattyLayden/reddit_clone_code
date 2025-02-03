import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, IconButton, Typography, Box } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';

import { useState } from 'react';


import SendIcon from '@mui/icons-material/Send';

import { useNavigate } from 'react-router-dom';




import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextareaAutosize from '@mui/material/TextareaAutosize';


import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { useEffect } from 'react';

import axios from 'axios';

import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

//comment object

// [
//     {
//         dateAdded: "x",                    
//         commentInformation: "x",           
//         upvotes: "x",                      
//         author: {
//             username: "x"
//             icon: "x"                  
//         },
//         replies: [
//             {
//                 dateAdded: "x",            
//                 commentInformation: "x",   
//                 upvotes: "x",              
//                 author: {
//                     username: "x", 
//                     icon: "x"       
//                 }
//             },
//             // Other replies can follow the same structure
//         ],
//         whenAdded: "x"                      
//     },
//     
// ]

export default function CommentSection({ userInfo, comments, postId, triggerReFetch, questionMark }) {
    const [openDialog, setOpenDialog] = useState(false)
    const [replyTo, setReplyTo] = useState(null); 
    const [commentText, setCommentText] = useState(''); 
    const [commentsState, setCommentsState] = useState(comments);
    const [replySubmitted, setReplySubmitted] = useState(false)
  
    const newpostId = postId;

    const navigate = useNavigate();

    const token = localStorage.getItem('jwtToken')

    const handleLoginClick = () => {
        setOpenDialog(false)
        navigate('/login')
    }

    useEffect(() => {
        setCommentsState(comments); 
    }, [comments]);

    
    const updateVotes = (comment, voteType) => {
        if (voteType === 'upvote') {
            if (!userInfo.isAuthenticated) {
                setOpenDialog(true); 
                return;
            }
          if (comment.upvoted) {
            return { ...comment, upvotes: comment.upvotes - 1, upvoted: null };
          } else if (!comment.upvoted && !comment.downvoted) {
            return { ...comment, upvotes: comment.upvotes + 1, upvoted: true };
          } else if (!comment.upvoted && comment.downvoted) {
            return { ...comment, upvotes: comment.upvotes + 2, downvoted: null, upvoted: true };
          }
        } else if (voteType === 'downvote') {
            if (!userInfo.isAuthenticated) {
                setOpenDialog(true); 
                return;
            }
          if (comment.downvoted) {
            return { ...comment, upvotes: comment.upvotes + 1, downvoted: null };
          } else if (!comment.downvoted && !comment.upvoted) {
            return { ...comment, upvotes: comment.upvotes - 1, downvoted: true };
          } else if (!comment.downvoted && comment.upvoted) {
            return { ...comment, upvotes: comment.upvotes - 2, upvoted: null, downvoted: true };
          }
        }
        return comment; 
      };
    
      
      const handleVoteState = (commentId, voteType) => {

        if(userInfo.isAuthenticated){

        
        const updateCommentTree = (comments) => {
          return comments.map((comment) => {
            if (comment.id === commentId) {
              return updateVotes(comment, voteType);
            }
            if (comment.replies && comment.replies.length > 0) {
              return { ...comment, replies: updateCommentTree(comment.replies) };
            }
            return comment;
          });
        };
      
        const updatedComments = updateCommentTree(commentsState);
        setCommentsState(updatedComments); 
    }else{
        setOpenDialog(true)
    }
    };
      
  
    
    const handleReplyClick = (commentId) => {
      setReplyTo(commentId); 
    };
  
    const handleCommentChange = (event) => {
      setCommentText(event.target.value); 
    };
  
    const handleCommentSubmit = async (commentId) => {
      console.log(`Submitting reply to comment ${commentId}:`, commentText);
      

        try{

            if(userInfo.isAuthenticated){
                const response = await axios.post(`/api/comment/${commentId}/reply`,
                    {newComment: commentText, postId: newpostId},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                          },
                    }
                )
    
                if(response.status === 200){
                    setReplySubmitted(true)
                    console.log(response.data.message)
    
                    triggerReFetch();
                    
                }
            }else{
                setOpenDialog(true)
            }
            
            

        }catch(error){
            console.log(`Error: ${error}`)
        }finally{
            setCommentText('')
            setReplyTo(null)
            
        }
           
    };
  
    
  
    return (
      <List>
        {/* Only map over top-level comments (comments without a parentCommentId) */}
        {commentsState
          .filter((comment) => !comment.parentCommentId) 
          .map((comment) => (
            <div key={comment.id}>
              {/* Main Comment */}
              <ListItem alignItems="flex-start">
                
                <ListItemAvatar>
                  <Avatar
                    sx={{ cursor: 'pointer' }}
                    alt={comment.author.username}
                    src={comment.author.icon}
                    onClick={() => navigate(`/user/${comment.author.username}`)}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        component="span"
                        variant="body1"
                        sx={{
                          color: 'text.primary',
                          display: 'inline',
                          cursor: 'pointer',
                          marginBottom: '16px', 
                        }}
                        onClick={() => navigate(`/user/${comment.author.username}`)}
                      >
                        {comment.author.username} {' — '}
                        {comment.whenAdded}
                      </Typography>
                      <Typography variant="body2">{comment.commentInformation}</Typography>
                    </Box>
                  }
                />
              </ListItem>
  
              
              <Box
                sx={{
                  color: 'black',
                  gap: '16px',
                  paddingLeft: '64px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <ArrowUpwardIcon
                  edge="end"
                  sx={{
                    borderRadius: '50%',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    backgroundColor: comment.upvoted ? '#505354' : 'transparent',
                    '&:hover': {
                      backgroundColor: '#505354',
                    },
                  }}
                  onClick={() => handleVoteState(comment.id, 'upvote')}
                />
                <Typography variant="body2" sx={{ margin: 0, padding: 0 }}>
                  {comment.upvotes}
                </Typography>
                <ArrowDownwardIcon
                  edge="end"
                  sx={{
                    borderRadius: '50%',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    backgroundColor: comment.downvoted ? '#505354' : 'transparent',
                    '&:hover': {
                      backgroundColor: '#505354',
                    },
                  }}
                  onClick={() => handleVoteState(comment.id, 'downvote')}
                />
                <IconButton edge="end" sx={{ color: 'black' }} onClick={() => handleReplyClick(comment.id)}>
                  <ReplyIcon />
                </IconButton>
              </Box>
  
              
              {replyTo === comment.id && (
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px', paddingLeft: '56px' }}>
                  <InputAdornment position="start">
                    <img
                      src={userInfo.isAuthenticated ? userInfo.icon : questionMark}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        marginRight: '8px',
                      }}
                    />
                  </InputAdornment>
                  <FormControl variant="standard" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
                    <TextareaAutosize
                      minRows={2}
                      maxRows={10}
                      placeholder="Write a reply..."
                      value={commentText}
                      onChange={handleCommentChange}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: 'none',
                        outline: 'none',
                        resize: 'none',
                        backgroundColor: '#f5f5f5',
                        color: 'black',
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '1rem',
                      }}
                    />
                  </FormControl>
                  <Box>
                    <IconButton
                      onClick={() => handleCommentSubmit(comment.id)}
                      sx={{ 
                        padding: '8px', 
                        borderRadius: '4px', 
                        backgroundColor: '#f5f5f5', 
                        color: 'black', 
                        marginLeft: '8px', 
                      }}
                    >
                      <SendIcon/>
                    </IconButton>
                  </Box>
                </Box>
              )}
  
              {/* Nested Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div style={{ paddingLeft: '48px' }}>
                  {comment.replies.map((reply) => (
                    <Box key={reply.id} sx={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
                      {/* Reply Content */}
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            alt={reply.author.username}
                            src={reply.author.icon || '/static/images/default-avatar.jpg'}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Typography
                                component="span"
                                variant="body1"
                                sx={{
                                  color: 'text.primary',
                                  display: 'inline',
                                  cursor: 'pointer',
                                  marginBottom: '16px',
                                }}
                                onClick={() => navigate(`/user/${reply.author.username}`)}
                              >
                                {reply.author.username} {' — '} {reply.whenAdded}
                              </Typography>
                              <Typography variant="body2">{reply.commentInformation}</Typography>
                            </Box>
                          }
                        />
                      </ListItem>
  
                      
                      <Box
                        sx={{
                          color: 'black',
                          gap: '16px',
                          paddingLeft: '64px',
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}
                      >
                        <ArrowUpwardIcon
                          edge="end"
                          sx={{
                            borderRadius: '50%',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                            backgroundColor: reply.upvoted ? '#505354' : 'transparent',
                            '&:hover': {
                              backgroundColor: '#505354',
                            },
                          }}
                          onClick={() => handleVoteState(reply.id, 'upvote')}
                        />
                        <Typography variant="body2" sx={{ margin: 0, padding: 0 }}>
                          {reply.upvotes}
                        </Typography>
                        <ArrowDownwardIcon
                          edge="end"
                          sx={{
                            borderRadius: '50%',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                            backgroundColor: reply.downvoted ? '#505354' : 'transparent',
                            '&:hover': {
                              backgroundColor: '#505354',
                            },
                          }}
                          onClick={() => handleVoteState(reply.id, 'downvote')}
                        />
                      </Box>
                    </Box>
                  ))}
                </div>
              )}
            </div>
          ))}


                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>You need to be logged in.</DialogTitle>
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
          
      </List>

      
                
)


    
  }

  
  
  

