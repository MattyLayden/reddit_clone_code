
import React, {useState, useEffect} from 'react'


import axios from 'axios'

import SendIcon from '@mui/icons-material/Send';

import { IconButton } from '@mui/material';


import { useNavigate } from 'react-router-dom';
//comment object

// [
//     {   id: "123",
//         dateAdded: "x",                    
//         commentInformation: "x",           
//         upvotes: "x",                      
//         author: {
//             username: "x"                  
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


import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextareaAutosize from '@mui/material/TextareaAutosize';


import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';


import Box from '@mui/material/Box'

import CommentSection from '../react_components/commentSection.jsx'

// export default function AlignItemsList() {
//   return (
//     <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Brunch this weekend?"
//           secondary={
//             <React.Fragment>
//               <Typography
//                 component="span"
//                 variant="body2"
//                 sx={{ color: 'text.primary', display: 'inline' }}
//               >
//                 Ali Connors
//               </Typography>
//               {" — I'll be in your neighborhood doing errands this…"}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//       <Divider variant="inset" component="li" />



export default function ViewPostComments({ userInfo, parsedId }){
    const [openDialog, setOpenDialog] = useState(false)
    const [commentInformation, setCommentInformation] = useState('');
    const [comment, setComment] = useState('')
    const [commentSubmitted, setCommentSubmitted] = useState(false)
    const [replySubmitted, setReplySubmitted] = useState(false)
    const [questionMark, setQuestionMark] = useState('')
    //remember to migrate model for the miscellaneous prisma requests via rest api

    const token = localStorage.getItem('jwtToken')

    const navigate = useNavigate();

    console.log(`is user authenticated : ${userInfo.isAuthenticated}`)

    const handleLoginClick = () => {
        setOpenDialog(false)
        navigate('/login')
    }

    useEffect(() => {
        console.log('Now entering if !userinfo loop')
        
            async function questionMarkFetch(){
                    const response = await axios.get('/api/user/questionmark')
                    console.log(response.data)
                if(response.status === 200){
                    setQuestionMark(response.data.questionImage)
                    console.log('Successfully obtained question mark image via rest api.')
                    console.log(response.data.questionImage)
                }else if(response.status === 500){
                    console.log(`Error : ${response.status}`)
                }
            }

            questionMarkFetch()
            
        
    }, [userInfo])

    

    async function getCommentInfo() {
        try {
            const response = await axios.get(`/api/posts/singlepostview/commentinfo/${parsedId}`);
            
            if (response.status === 200) {
                setCommentInformation(response.data);
            } else if (response.status === 404) {
                setCommentInformation(response.data.message);
            } else {
                console.log('Unknown error');
            }
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }
    useEffect(() => {

        console.log(`Old comments... ${JSON.stringify(commentInformation)}`)

       getCommentInfo();
        

        console.log(`New comments... ${JSON.stringify(commentInformation)}`)
    }, [parsedId, commentSubmitted, replySubmitted]);

    const triggerReFetch = () => {
        setReplySubmitted(prev => !prev);  
      };

    
    async function handleSubmitComment() {
        if (!comment.trim()) {
            return;
        }

        try {
            if(userInfo.isAuthenticated){

                setCommentSubmitted(true)
            const response = await axios.post(`/api/comment/${parsedId}/makeComment`, {
                comment: comment
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            }    
        );

            if (response.status === 200) {
                console.log(response.data.message);

                
                setComment("");

                
            }

        }else{
            setOpenDialog(true)

        }
           
        } catch (error) {
            console.log(`Error: ${error}`);
        }finally{
            setCommentSubmitted(false)
        }
    }


    return(

        <div className="comment-section">

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

<Box sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
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
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
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
            <IconButton 
        sx={{ 
          padding: '8px', 
          borderRadius: '4px', 
          backgroundColor: '#f5f5f5', 
          color: 'black', 
          marginLeft: '8px', 
        }}
        onClick={handleSubmitComment}
      >
        <SendIcon />
      </IconButton>

      </FormControl>


    </Box>


            
            
            {commentInformation ? (

                <div className="comments-container">
                    <CommentSection userInfo={userInfo} comments={commentInformation} postId={parsedId} triggerReFetch={triggerReFetch} questionMark={questionMark}/>
                </div>
                
                
            ) : (

                <div id="noComments">
                    <p id="noCommentsText">No comments found.</p>
                </div>
            
            )}

              

        </div>
        

    )
}