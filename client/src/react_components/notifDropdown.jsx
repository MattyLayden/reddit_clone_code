import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';


// Comments made on user's post.

// {
//     "id" : 5 (given that this is the id of the comment)
//     "dateAdded": "2024-10-06T12:34:56.789Z",
//     "commentInformation": "This is a great post! Thanks for sharing.",
//     "author": {
//       "username": "exampleUser",
//       "icon": "https://www.example.com/icon1.jpg"
//     },
//     "parentPost": {
//        "id": 12
//       "title": "Understanding JavaScript Closures",
//       "subreddit": {
//         "name": "learnprogramming"
//       }
//     }
//     "whenAdded" : "32 minutes ago"
//   }

  
// Replies to the user's comment

//   {
//     "dateAdded": "2024-10-06T14:20:00.000Z",
//     "commentInformation": "I totally agree with you!",
//     "author": {
//       "username": "anotherUser",
//       "icon": "https://www.example.com/icon2.jpg"
//     },
//     "parentComment": {
//       "parentPost": {
//          "id": 7
//         "subreddit": {
//           "name": "programming"
//         }
//       }
//     }
//    "whenAdded" : "32 minutes ago"
//   }
  



export default function NotifDropdown({ notification, handleClose }) {

    const navigate = useNavigate()

    const commentInfoSnippet = (comment) => {

        if(comment.length > 100){
            return comment.slice(0,97) + "..."
        }else{
            return comment
        }
    }

    const handlePostRoute = () => {
      navigate(`/post/${notification.parentPost.id}`)
      handleClose()
    }

    const handleCommentRoute = () => {
      navigate(`/post/${notification.parentComment.parentPost.id}`)
      handleClose()
    }


  return (
    <>
      {/* Comment on post notification */}
      {notification.parentPost ? (
        <MenuItem onClick={handlePostRoute}>
          <ListItemIcon>
            <img
              src={notification.author.icon}
              alt={`User Icon missing.`}
              style={{ width: 24, height: 24, borderRadius: '50%' }}
            />
          </ListItemIcon>
          <div style={{ flexGrow: 1 }}>
            <ListItemText 
              primary={
                <Typography variant="body1">
                  {notification.author.username} Replied to your post in {notification.parentPost.subreddit.name}
                </Typography>
              }
              secondary={
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {commentInfoSnippet(notification.commentInformation)}
                </Typography>
              }
            />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {notification.whenAdded}
            </Typography>
          </div>
        </MenuItem>
      ) : (
        // If else is fine here as only 2 types of notification
        <MenuItem onClick={handleCommentRoute}>
          <ListItemIcon>
            <img
              src={notification.author.icon}
              alt={`User Icon missing.`}
              style={{ width: 24, height: 24, borderRadius: '50%' }}
            />
          </ListItemIcon>
          <div style={{ flexGrow: 1 }}>
            <ListItemText 
              primary={
                <Typography variant="body1">
                  {notification.author.username} Replied to your comment in {notification.parentComment.parentPost.subreddit.name}
                </Typography>
              }
              secondary={
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {commentInfoSnippet(notification.commentInformation)}
                </Typography>
              }
            />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {notification.whenAdded}
            </Typography>
          </div>
        </MenuItem>
      )}
    </>
  );
}
