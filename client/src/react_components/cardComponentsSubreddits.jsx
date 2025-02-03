
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



 {/* post object (10 of these as take 10) = 
                {id: 12, title :x, dateadded:y, postInformation: z, fileUrl: z, articleLink: z,
                upvotes: a, author:{username: b, icon: c}, _count:{comments: 10}, whenadded: xyz} 
                 */}

                 export function ArticleCardSubreddit({ loading, post }) {
                  const { id, title, dateAdded, postInformation, fileUrl, articleLink, upvotes, author, _count, whenAdded } = post;

                  const navigate = useNavigate();

                  function handleUsernameClick(username){
                    navigate(`/user/${username}`)
                  }
                  
                  function handlePostClick(postId){
                    navigate(`/post/${postId}`)
                  }
              
                  return (
                    <Card sx={{ maxWidth: 690, m: 2, boxShadow:'none', backgroundColor:'#f5f5f5', transition:'background-color 0.3s', '&:hover':{backgroundColor:'#e0e0e0' } }}>
                      <CardHeader
                          avatar={
                            loading ? (
                              <Skeleton animation="wave" variant="circular" width={80} height={80} />
                            ) : (
                              <Avatar
                                alt="User icon missing"
                                src={author.icon}
                                sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
                                onClick={() => handleUsernameClick(author.username)}
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
                              
                              onClick={() => handleUsernameClick(author.username)}
                              >
                                {author.username}
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
              
                     
                      {loading ? (
                        <Skeleton animation="wave" height={60} width="90%" sx={{ m: 2 }} />
                      ) : (
                        <Typography variant="h6" color="text.primary" sx={{ fontWeight: 'bold', cursor: 'pointer', '&:hover': { color: 'primary.main' } }} onClick={() => handlePostClick(id)}>
                          {title}
                        </Typography>
                      )}
              
                      
                      {loading ? (
                        <Skeleton sx={{ height: 380 }} animation="wave" variant="rectangular" />
                      ) : (
                        <CardMedia
                          component="img"
                          height="140"
                          image={fileUrl}
                          onClick={() => window.location.href = articleLink}
                          alt={articleLink}
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
  


export function ImageCardSubreddit({ loading, post }) {
    const {id, title, dateAdded, postInformation, fileUrl, articleLink, upvotes, author, _count, whenAdded } = post;

    const navigate = useNavigate();

    function handleUsernameClick(username){
      navigate(`/user/${username}`)
    }
    
    function handlePostClick(postId){
      navigate(`/post/${postId}`)
    }

    return (
      <Card sx={{ maxWidth: 690, m: 2, boxShadow:'none', backgroundColor:'#f5f5f5', transition:'background-color 0.3s', '&:hover':{backgroundColor:'#e0e0e0' } }}>
        <CardHeader
            avatar={
              loading ? (
                <Skeleton animation="wave" variant="circular" width={80} height={80} />
              ) : (
                <Avatar
                  alt={author.username} 
                  src={author.icon}
                  onClick={() => handleUsernameClick(author.username)}
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
                <Skeleton animation="wave" height={20} width="80%" />
              ) : (
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ cursor: 'pointer' }} 
                  onClick={() => handleUsernameClick(author.username)}
                  
                >
                  {author.username}
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
          
        
        {loading ? (
          <Skeleton animation="wave" height={60} width="90%" sx={{ m: 2 }} />
        ) : (
          <Typography
            variant="h6"
            color="text.primary"
            sx={{ m: 2, fontWeight: 'bold', cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
            onClick={() => handlePostClick(id)}
          >
            {title}
          </Typography>
        )}

        {loading ? (
          <Skeleton sx={{ height: 380 }} animation="wave" variant="rectangular" />
        ) : (
          <CardMedia
            component="img"
            height="280"
            image={fileUrl}
            alt={title}
            sx={{
              cursor: 'pointer',
              '&:hover': { opacity: 0.9 }
            }}
          />
        )}
        <CardContent>
          {loading ? (
            <>
              <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={20} width="80%" />
            </>
          ) : (
            <Typography variant="body2" component="p" sx={{ color: 'text.secondary' }} onClick={() => handlePostClick(id)}>
              {postInformation}
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



  




function truncateText(text, maxLength) {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

export function StringCardSubreddit({ loading, post }) {
    const { id, title, dateAdded, postInformation, fileUrl, articleLink, upvotes, author, _count, whenAdded } = post;
    const previewText = truncateText(postInformation, 100); 

    const navigate = useNavigate();

    function handleUsernameClick(username){
      navigate(`/user/${username}`)
    }

    function handlePostClick(postId){
      navigate(`/post/${postId}`)
    }

    return (
      <Card sx={{ maxWidth: 690, m: 2, boxShadow:'none', backgroundColor:'#f5f5f5', transition:'background-color 0.3s', '&:hover':{backgroundColor:'#e0e0e0' }}}>
        <CardHeader
            avatar={
              loading ? (
                <Skeleton animation="wave" variant="circular" width={80} height={80} />
              ) : (
                <Avatar
                  alt={author.username} 
                  src={author.icon}
                  sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
                  onClick={() => handleUsernameClick(author.username)}
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
                  onClick={() => handleUsernameClick(author.username)} 
                >
                  {author.username}
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

        
        {loading ? (
          <Skeleton animation="wave" height={60} width="90%" sx={{ m: 2 }} />
        ) : (
          <Typography variant="h6" color="text.primary" sx={{ m: 2 }} onClick={() => handlePostClick(id)}>
            {title}
          </Typography>
        )}

        
        <CardContent sx={{ textAlign: 'left', p: 2 }}>
          {loading ? (
            <Skeleton sx={{ height: 100 }} animation="wave" variant="rectangular" />
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ height: 50 }} onClick={() => handlePostClick(id)}>
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

  