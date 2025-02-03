
import * as React from 'react';

import {useParams} from 'react-router-dom'
import { useEffect, useState} from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';


import { ArticleCardUser, ImageCardUser, StringCardUserComment, StringCardUserPost } from '../react_components/cardComponentsUser';
import { CategorySelect, TypeSelect } from '../react_components/userPageCategories';

// object example: comment {upvotes: x, dateadded: x, whenAdded: x, commentinformation: x, parentPost:{id:x, title:y, subreddit:{name:x, icon: x}}, parentComment:{author:{username: x}}}
// post : {id: x, title: x, dateadded: x, whenAdded: x, postinformation: x, fileurl: x, articleLink: x, upvotes: x, _count:{comments: x}}

export default function UserFeed(){

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState('new');
    const [type, setType] = useState('all')
    const [page, setPage] = useState(1);
    
    // types: all, posts, comments
    // category: new, top

    const {user} = useParams();


    const changeCategoryChildComponent = (newCategory) => {
        setPage(1)
        setCategory(newCategory)
        console.log('New category is', category)
      }

      const changeTypeChildComponent = (newType) => {
        setPage(1)
        setType(newType)
      }
  
      const handlePageChange = (event, value) => {
          setPage(value)
      }
    
    useEffect(() => {
        async function getPosts(){
            setLoading(true)
            try{
                const skip = (page-1)*10

                const response = await axios.get(`/api/user/${user}/${type}/${category}`,{
                    params: { skip }
                })

                if(response.status === 200){
                    console.log(`Status 200, logging posts`)
                    console.log(response.data)
                    setPosts(response.data)
                }else if(response.status === 404){
                    console.log(`Error ${response.data.error}`)
                }
            }catch(error){
                console.log(`Error :${error}`)
            }finally{
                setLoading(false)
            }
        }
        getPosts()
    }, [user, type, category, page])

    return(
        <div className='feed-container'>
            <div id="sortByBar">
                <CategorySelect category={category} onCategoryChange={changeCategoryChildComponent}/>
                <TypeSelect type={type} onTypeChange={changeTypeChildComponent}/>
            </div>

            <ul>
                {posts.map((post) => {
                    if(post.parentPost && !post.parentComment){
                        return(
                            <li key={post.id}>
                                {/* commented on  this post x*/}
                                <StringCardUserComment loading={loading} post={post} commentType = 'normalComment' username={user}/>
                            </li>
                        )
                    }else if(post.parentPost && post.parentComment){
                        return(
                            <li key={post.id}>
                            {/* replied to username (also a comment)*/}
                            <StringCardUserComment loading={loading} post={post} commentType='reply' username={user}/>
                        </li>
                        )
                            
                    }else{
                        if(!post.fileUrl){
                            return(

                            
                            <li key={post.id}>
                                {/*string post */}
                                <StringCardUserPost loading={loading} post={post}/>
                            </li>
                            )
                        }else{
                            if(post.fileUrl && !post.articleLink){
                                return(
                                <li key={post.id}>
                                     {/* photo post*/}
                                     <ImageCardUser loading={loading} post={post}/>
                                </li>
                                )
                            }else if(post.fileUrl && post.articleLink){
                                return(

                                
                                <li key={post.id}>
                                    {/* article post x*/}
                                    <ArticleCardUser loading={loading} post={post}/>
                                </li>
                                )
                            }
                        }
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
    )
}