
// model Post{
//     id Int @id @default(autoincrement())
//     title String
//     dateAdded DateTime
//     postInformation String?
//     fileUrl String?
//     articleLink String?
//     upvotes Int
//     subredditId Int
//     subreddit Subreddit @relation(fields: [subredditId], references: [id])
//     comments Comment[]
//     authorId Int
//     author User @relation(fields:[authorId], references: [id])
//   }




import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress'; 
import { useSubreddits } from '../context/subredditContext';
import { useNavigate } from 'react-router-dom';
import '../css/create-post-components.css';

export default function CreateTextPost() {

  const [title, setTitle] = useState('');
  const [textBody, setTextBody] = useState('');
  const [successfulSubmitObject, setSuccessfulSubmitObject] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [subredditToPostTo, setSubredditToPostTo] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  const subreddits = useSubreddits();
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      setSubmitLoading(true);
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.log('Token invalid, rerouting to login page');
        navigate('/login');
      }

      console.log('SUBREDDIT OBJECT OR')
      console.log(subredditToPostTo)

      const postResponse = await axios.post('/api/posts/upload/text', {
        titleOfPost: title,
        bodyOfPost: textBody,
        subredditName: subredditToPostTo.name,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (postResponse.status === 400) {
        console.log(`${postResponse.data}`);
        setErrorMessage(postResponse.data.error);
      }
      if (postResponse.status === 201) {
        console.log('Post created successfully. Attempting to axios.get tick image.', postResponse.data);

        const getResponse = await axios.get('/api/upload/misc/greenTick');

        if(getResponse.status === 200){
            setSuccessfulSubmitObject({
                submitTrue: true,
                newPostId: postResponse.data.post.id,
                submitTick: getResponse.data.photo,
            })
        }else if(getResponse.status === 400){
            console.log(`getResponse false: ${getResponse.data.error}`)
            setSuccessfulSubmitObject({
                submitTrue: false,
                newPostId: postResponse.data.post.id
            })
        }

      } else {
        console.log('Unexpected postResponse status:', postResponse.status);
      }
    } catch (error) {
      console.log('Error uploading text post:', error);
      setErrorMessage('An error occurred while submitting the post.');
    } finally {
      setSubmitLoading(false);
    }
  }

  function handleNewPostClick() {
    let parsedId;
    if(successfulSubmitObject.newPostId){
        parsedId = parseInt(successfulSubmitObject.newPostId);
    }
    
    navigate(`/post/${parsedId}`);
  }

  return (
    <>
      
        {submitLoading ? (
          <div className="loadingContainer">
            <CircularProgress id="loading"/>
            <p id="submit-text">Submitting...</p>
          </div>
        ) : (
          <>
            {successfulSubmitObject.submitTrue ? (
              <div className="post-success">
                <p id= "post-created" > Post successfully created!</p>
                <img id="submit-tick" src={successfulSubmitObject.submitTick}/>
                <Button onClick={handleNewPostClick} id="view-post-button">
                  View post
                </Button>
              </div>
            ) : (
              <>
                <Autocomplete
                  id="subredditDropdown"
                  options={subreddits}
                  value={subredditToPostTo}
                  onChange={(event, newValue) => setSubredditToPostTo(newValue)}
                  getOptionLabel={(option) => option.name || ''}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      <img
                        loading="lazy"
                        width="20"
                        src={option.icon}
                        alt=""
                      />
                      {option.name}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose a subreddit"
                      fullWidth
                    />
                  )}
                  sx={{ marginBottom: 2, width: '100%' }}
                />
                {errorMessage && (
                  <p id="error-message" style={{ color: 'red' }}>
                    {errorMessage}
                  </p>
                )}
<TextField
  id="title"
  label="Title"
  variant="outlined"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  sx={{ marginBottom: 2, width: '100%' }} 
/>

<TextField
  id="bodyText"
  label="Body"
  variant="outlined"
  value={textBody}
  onChange={(e) => setTextBody(e.target.value)}
  multiline
  minRows={4}
  sx={{
    marginBottom: 2,
    width: '100%', 
    maxHeight: '300px', 
    overflowY: 'auto', 
    resize: 'vertical',

  }}
/>

                <Button variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              </>
            )}
          </>
        )}
    </>
  );
}
