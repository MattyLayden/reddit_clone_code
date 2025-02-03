import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../css/feeds.css'

import { useNavigate} from 'react-router-dom';

import { Stack } from '@mui/material';


import Alert from '@mui/material/Alert';

import {useAuth} from '../context/userContext.js'


//importing material ui components

import BasicSelect from '../react_components/categoryDropdown.jsx';
import {ArticleCardHome, ImageCardHome, StringCardHome} from '../react_components/cardComponentsHome.jsx'


import Pagination from '@mui/material/Pagination';

//home page if user not logged in, home page input is userid=0
//else any page receives userid either from jwt or the url 



/// homepage posts rest api fetch location defined in server.js as e.g.  api/posts/home/loggedin/new

//example of home one post in posts state

// {
//   "id": 1,
//   "title": "The Impact of Shakespeare on Modern Literature",
//   "dateAdded": "2024-10-01T12:00:00Z",
//   "postInformation": "A deep dive into the influence of Shakespeare's works on contemporary authors.",
//   "fileUrl": "https://example.com/images/shakespeare.jpg",
//   "articleLink": "https://example.com/articles/shakespeare-influence",
//   "upvotes": 120,
//   "subreddit": {
//       "name": "Literature",
//       "icon": "https://example.com/icons/literature.jpg"
//   },
//   "comments": {
//       "count": 5
//   },
//   "whenAdded": "2 days ago",
// }


// perhaps add individual loading states for each card



export default function HomePageFeedInfo() {
  
    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('topAllTime'); 
    const [page, setPage] = useState(1)

    const {isAuthenticated} = useAuth()

    const changeCategoryChildComponent = (newCategory) => {
      setCategory(newCategory)
      setPage(1)
    }

    
    console.log('posts: ', posts)
  
    
    
    useEffect(() => {
        async function getPosts() {
          setLoading(true)
            try {


                const skip = (page - 1) * 10;

                if(isAuthenticated){

                  const token = localStorage.getItem('jwtToken')
                  const response = await axios.get(`/api/posts/home/loggedin/${category}`, 
                    {
                      params: 
                        {skip},
                      headers:{
                        Authorization: `Bearer ${token}`
                      }
                    }
                  );
                  console.log(response.data)
                  setPosts(response.data);

                }else{
                  const response = await axios.get(`/api/posts/home/notloggedin/${category}`,
                    {
                      params: {skip}
                    }
                  )
                  console.log(response.data)
                  setPosts(response.data)
                }

            } catch (error) {
                console.log(`Error obtaining posts via getPosts REST API: ${error}`);
            } finally {
                setLoading(false);
            }
        }

        getPosts();
    }, [category, page, isAuthenticated]); 

  
    const handlePageChange = (event, value) => {
      setPage(value); 
  };

    console.log(`Home feed rendered`, posts)

    return (
        <div className='feed-container'>
            <div id="sortByBar">
            <BasicSelect category={category} onCategoryChange={changeCategoryChildComponent}/>
            </div>

            <ul>
              {posts.map((post) => {
                if(post.fileUrl && !post.articleLink){
                  return(

                  //post.id as key rather than index

                  <li key={post.id}>

                  <ImageCardHome loading={loading} post={post}/>

                  </li>

                  )

                }else if(post.fileUrl && post.articleLink){
                  return(
                    <li key={post.id}> 

                    <ArticleCardHome loading={loading} post={post}/>
                  
                    </li>

                  )

                }else if(!post.fileUrl && !post.articleLink){
                  return(

                  <li key={post.id}>

                  <StringCardHome loading={loading} post={post}/>

                  </li>
                  )
                }else{
                  <Alert key={post.id}>Error obtaining posts.</Alert>
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
        </div>
    );
}



  
  //'/api/subreddit/:subreddit/category


  //example of subreddit post in feed


  // {
  //   "title": "The Importance of Hamlet in Literature",
  //   "dateAdded": "2024-10-01T12:00:00Z",
  //   "postInformation": "An exploration of Hamlet's themes and its relevance today.",
  //   "upvotes": 150,
  //   "author": {
  //     "username": "literatureFan92",
  //     "icon": "https://example.com/icons/literatureFan92.jpg"
  //   },
  //   "whenAdded": "2 days ago",
  //   "_count": {
  //     "comments": 10
  //   }
  // }
  


  

//module.exports is when using require. export functions when importing them elsewhere
// module.exports = {HomePageFeedInfo, SubredditFeedInfo}