

import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';

import {useNavigate} from 'react-router-dom'

// example of object
// {id: 12, title: x, dateadded: x, postinformation: x, fileurl: x, articlelink:x, upvotes:x, subreddit:{name:x, icon:y}, _count:{comments:23}, whenAdded}





export function ArticleCardHome({ loading, post }) {
  const { id, title, fileUrl, articleLink, upvotes, subreddit, _count, whenAdded } = post;
  const navigate = useNavigate();

  const handleSubredditClick = () => navigate(`/subreddit/${subreddit.name}`);
  const handlePostClick = () => navigate(`/post/${id}`);

  return (
    <Card sx={{ maxWidth: 690, m: 2, boxShadow:'none', backgroundColor:'#f5f5f5', transition:'background-color 0.3s', '&:hover':{backgroundColor:'#e0e0e0' }}}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton animation="wave" variant="circular" width={80} height={80} />
          ) : (
            <Avatar
              alt={subreddit.name}
              src={subreddit.icon}
              onClick={handleSubredditClick} 
              sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
            />
          )
        }
        action={
          loading ? null : (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={
          loading ? (
            <Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: 6 }} />
          ) : (
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ cursor: 'pointer' }}
              onClick={handlePostClick} 
            >
              {subreddit.name}
            </Typography>
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={20} width="40%" />
          ) : (
            <Typography variant="body2" color="text.secondary">
              {whenAdded}
            </Typography>
          )
        }
      />

      
      <CardContent sx={{ pb: 0 }}>
        {loading ? (
          <Skeleton animation="wave" height={60} width="90%" sx={{ m: 2 }} />
        ) : (
          <Typography
            variant="h6"
            color="text.primary"
            sx={{ m: 2, fontWeight: 'bold', cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
            onClick={handlePostClick}
          >
            {title}
          </Typography>
        )}
      </CardContent>

      
      {loading ? (
        <Skeleton sx={{ height: 380 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          component="img"
          height="280"
          image={fileUrl}
          onClick={() => window.location.href = articleLink} // Click the image to navigate to the article
          alt={title}
          sx={{
            cursor: 'pointer',
            '&:hover': { opacity: 0.9 }
          }}
        />
      )}

      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        {loading ? (
          <Skeleton animation="wave" height={20} width="30%" />
        ) : (
          <Typography variant="body2" color="text.secondary">
            {upvotes} upvotes
          </Typography>
        )}
        {loading ? (
          <Skeleton animation="wave" height={20} width="30%" />
        ) : (
          <Typography variant="body2" color="text.secondary">
            {_count.comments} comments
          </Typography>
        )}
      </Box>
    </Card>
  );
}
  

  export function ImageCardHome({ loading, post }) {
    const { id, title, fileUrl, upvotes, subreddit, _count, whenAdded } = post;
    const navigate = useNavigate();
  
    
    const handleSubredditClick = () => navigate(`/subreddit/${subreddit.name}`);
    const handlePostClick = () => navigate(`/post/${id}`);
  
    return (
      <Card sx={{ maxWidth: 690, m: 2, boxShadow:'none', backgroundColor:'#f5f5f5', transition:'background-color 0.3s', '&:hover':{backgroundColor:'#e0e0e0' }}}>
        <CardHeader
          avatar={
            loading ? (
              <Skeleton animation="wave" variant="circular" width={80} height={80} />
            ) : (
              <Avatar
                alt={subreddit.name}
                src={subreddit.icon}
                onClick={handleSubredditClick}
                sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
              />
            )
          }
          action={
            loading ? null : (
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            )
          }
          title={
            loading ? (
              <Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: 6 }} />
            ) : (
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ cursor: 'pointer' }}
                onClick={handleSubredditClick} 
              >
                {subreddit.name}
              </Typography>
            )
          }
          subheader={
            loading ? (
              <Skeleton animation="wave" height={20} width="40%" />
            ) : (
              <Typography variant="body2" color="text.secondary">
                {whenAdded}
              </Typography>
            )
          }
        />
  
        
        <CardContent sx={{ pb: 0 }}>
          {loading ? (
            <Skeleton animation="wave" height={60} width="90%" sx={{ m: 2 }} />
          ) : (
            <Typography
              variant="h6"
              color="text.primary"
              sx={{ m: 2, fontWeight: 'bold', cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
              onClick={handlePostClick}
            >
              {title}
            </Typography>
          )}
        </CardContent>
  
        
        {loading ? (
          <Skeleton sx={{ height: 380 }} animation="wave" variant="rectangular" />
        ) : (
          <CardMedia
            component="img"
            height="280"
            image={fileUrl}
            onClick={handlePostClick} 
            alt={title}
            sx={{
              cursor: 'pointer',
              '&:hover': { opacity: 0.9 }
            }}
          />
        )}
  
       
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          {loading ? (
            <Skeleton animation="wave" height={20} width="30%" />
          ) : (
            <Typography variant="body2" color="text.secondary">
              {upvotes} upvotes
            </Typography>
          )}
          {loading ? (
            <Skeleton animation="wave" height={20} width="30%" />
          ) : (
            <Typography variant="body2" color="text.secondary">
              {_count.comments} comments
            </Typography>
          )}
        </Box>
      </Card>
    );
  }


 

  export const truncateText = (text, length = 100) => {
    return text && text.length > length ? text.substring(0, length) + '...' : text;
  };
  export function StringCardHome({ loading, post }) {
    const { id, title, postInformation, upvotes, subreddit, _count, whenAdded } = post;
    const navigate = useNavigate();
    
    
    const previewText = truncateText(postInformation, 100);
    
    const handleSubredditClick = () => navigate(`/subreddit/${subreddit.name}`);
    const handlePostClick = () => navigate(`/post/${id}`);
    
    return (
      <Card sx={{ maxWidth: 690, m: 2, boxShadow:'none', backgroundColor:'#f5f5f5', transition:'background-color 0.3s', '&:hover':{backgroundColor:'#e0e0e0'}  }}>
        <CardHeader
          avatar={
            loading ? (
              <Skeleton animation="wave" variant="circular" width={80} height={80} />
            ) : (
              <Avatar
                alt={subreddit.name}
                src={subreddit.icon}
                sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
                onClick={handleSubredditClick}
              />
            )
          }
          action={
            loading ? null : (
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            )
          }
          title={
            loading ? (
              <Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: 6 }} />
            ) : (
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                onClick={handleSubredditClick}
              >
                {subreddit.name}
              </Typography>
            )
          }
          subheader={
            loading ? (
              <Skeleton animation="wave" height={20} width="40%" />
            ) : (
              <Typography variant="body2" color="text.secondary">
                {whenAdded}
              </Typography>
            )
          }
        />
        
        
        <CardContent sx={{ textAlign: 'left', p: 2 }}>
          {loading ? (
            <Skeleton animation="wave" height={60} width="90%" />
          ) : (
            <Typography
              variant="h6"
              color="text.primary"
              sx={{ fontWeight: 'bold', cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
              onClick={handlePostClick}
            >
              {title}
            </Typography>
          )}
          
          {loading ? (
            <Skeleton sx={{ height: 100 }} animation="wave" variant="rectangular" />
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 1, 
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' }
              }}
              onClick={handlePostClick}
            >
              {previewText}
            </Typography>
          )}
        </CardContent>
    
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          {loading ? (
            <Skeleton animation="wave" height={20} width="30%" />
          ) : (
            <Typography variant="body2" color="text.secondary">
              {upvotes} upvotes
            </Typography>
          )}
          {loading ? (
            <Skeleton animation="wave" height={20} width="30%" />
          ) : (
            <Typography variant="body2" color="text.secondary">
              {_count.comments} comments
            </Typography>
          )}
        </Box>
      </Card>
    );
  }
  
  

 // module.exports = {ArticleCardHome, ImageCardHome, StringCardHome, ArticleCardSubreddit, ImageCardSubreddit, StringCardSubreddit}
 //again, module.exports is for require, and instead export the functions