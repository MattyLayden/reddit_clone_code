import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useParams, useNavigate } from 'react-router-dom';

import { Stack } from '@mui/material';

import Alert from '@mui/material/Alert';


import '../css/feeds.css'

//importing material ui components

import BasicSelect from '../react_components/categoryDropdown.jsx';
import {ArticleCardSubreddit, ImageCardSubreddit, StringCardSubreddit} from '../react_components/cardComponentsSubreddits.jsx'


import Pagination from '@mui/material/Pagination';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import SubredditJoinButton from '../react_components/subredditJoinButton.jsx';

function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}



export default function SubredditFeed() {

    //subreddit here is {name: x, icon:y}

    const [posts, setPosts] = useState([]);
    const [postsLoading, setPostsLoading] = useState(true);
    const [category, setCategory] = useState('topAllTime'); 
    const [page, setPage] = useState(1)
    const [basicInfo, setBasicInfo] = useState([])
    const [basicInfoLoading, setBasicInfoLoading] = useState(true)
    const [userSubscribed, setUserSubscribed] = useState(false)
    
    const {subreddit} = useParams();

    const token = localStorage.getItem('jwtToken')
    console.log(`Token taken from local storage: ${token}`)


    const changeCategoryChildComponent = (newCategory) => {
      setPage(1)
      setCategory(newCategory)
    }

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    const handleSubscriptionChange = (newState) => {
        setUserSubscribed(newState);
    };

    useEffect(() => {
        async function checkSubscribed(){

            if(!token){
                console.log('No token received for check subscribed api call.')
            }

            try{
              const response = await axios.get(
                `/api/subreddit/${subreddit}/usersubscribed`,
                {
                    headers: { Authorization: `Bearer ${token}` }, 
                }
            );
                 

                if(response.status === 201){
                    
                    setUserSubscribed(response.response)
                }else if(response.status === 500){
                    console.log(`Error response ${response.status}`)
                }
            }catch(error){
                console.log(`Error obtaining subreddit subscription result via /user/subreddit/iSubscribed REST API ${error}`)
            }
        }
        checkSubscribed()
    }, [subreddit, token])
    

    useEffect(() => {
        async function getPosts() {
            try {
                
                const skip = (page-1)*10

                const response = await axios.get(`/api/subreddit/${subreddit}/${category}`, {
                  params: {
                    skip
                  }
                });

                if(response.status === 200){
                    console.log(response.data)
                    setPosts(response.data);
                }
            } catch (error) {
                console.error(`Error obtaining posts via /subreddit/category REST API: ${error}`);
            } finally {
                setPostsLoading(false);
            }
        }
        if(subreddit){
            getPosts();
        }

    }, [subreddit, category, page]); 

    useEffect(() => {
        async function getBasicInfo(){
            try{
                const response = await axios.get(`/api/subreddit/${subreddit}/basicInfo`)

                if(response.status === 200){
                    setBasicInfo(response.data)
                }
            }catch(error){
                console.log(`Error axios.getting basic info via basic info REST API: ${error}`)
            }finally{
                setBasicInfoLoading(false)
            }
        }

        if(subreddit){
            getBasicInfo();
        }
    }, [subreddit])



    useEffect(() => {
      async function updateRecentlyVisited(){

        if(!token){
            console.log('No token received for update recent visit api post call.')
        }
        try{
          const response = await axios.post(`/api/subreddit/${subreddit}/recentvisit`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
          if(response.status == 200){
            console.log(`recentSubs updated to include current subreddit.`)
          }else if(response.status === 500){
            console.log(`Error status 500`)
          }
        }catch(error){
          console.log(`Error axios.posting current subreddit to prisma user`)
        }
      }
      
        updateRecentlyVisited()
      

    }, [])


    {/*basic info object = {name :x, icon:y, description: z,
            subscribedUsers(count): 100} */}

            


    return (
        <div className='feed-container'>
            <div className="header-bar">
                <img id="sub-icon" style={{ height: '100px', width: '100px', borderRadius: '50%' }}  src={basicInfo.icon}/> 
                <p id="header-title">r/{basicInfo.name}</p>
            </div>
            <div id="sortByBar">
            <BasicSelect category={category} onCategoryChange={changeCategoryChildComponent}/>
            </div>

            {basicInfoLoading ? (
                <CircularIndeterminate /> // Display loading spinner when data is loading
            ) : (
                <div className="loaded-description">
                    <p id="description-title"> r/{basicInfo.name}</p>
                    
                        <p id="description">{basicInfo.description}</p>

                    <div id ="description-stats">
                        <p id="user-count-number">{basicInfo._count.subscribedUsers}</p>
                        <p
                            id="user-count-members-text"
                            style={{
                                color: 'black',
                                fontSize: '16px',
                                textAlign: 'center',
                                visibility: 'visible',
                                display: 'block',
                                wordWrap: 'break-word',
                                marginTop: '5px',
                                paddingTop: '5px',
                            }}
                            >
                            Users subscribed
                            </p>
                            <SubredditJoinButton
                                userSubscribed = {userSubscribed}
                                subredditName = {subreddit}
                                onSubscriptionChange = {handleSubscriptionChange}
                                token = {token}
                            />
                    </div>
                </div>
            )}
            
            
            <ul>
                {/* post object (10 of these as take 10) = 
                {title :x, dateadded:y, postInformation: z, fileUrl: z, articleLink: z,
                upvotes: a, author:{username: b, icon: c}, _count:{comments: 10}, whenadded: xyz} 
                 */}

              {posts.map((post) => {
                if(post.fileUrl && !post.articleLink){
                  return(

                  //post.id as key rather than index

                  <li id={post.id}>

                  <ImageCardSubreddit loading={postsLoading} post={post}/>

                  </li>

                  )

                }else if(post.fileUrl && post.articleLink){
                  return(
                    <li id={post.id}> 

                    <ArticleCardSubreddit loading={postsLoading} post={post}/>
                  
                    </li>

                  )

                }else if(!post.fileUrl && !post.articleLink){
                  return(

                  <li id={post.id}>

                  <StringCardSubreddit loading={postsLoading} post={post}/>

                  </li>
                  )
                }else{
                  <Alert>Error obtaining posts.</Alert>
                }
                
              })}
            </ul>
            
            <div id="pagination-bar">
              <Stack spacing={2}>
                  <Pagination
                    count={10} 
                    page={page} 
                    onChange={handlePageChange} 
                    color="primary" 
                    siblingCount={1} 
                    boundaryCount={1}
                  />
              </Stack>
            </div>

            {/*basic info object = {name :x, icon:y, description: z,
            subscribedUsers(count): 100} */}


        </div>
    );
  }