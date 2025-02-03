import express from 'express'

const router = express.Router();

import prisma from '../prisma/prismaClient.js'


import {newPostsFetch, topPostsTodayFetch, topPostsWeekFetch, topPostsMonthFetch, topPostsAlltimeFetch, newPostsNotLoggedInFetch, topPostsTodayNotLoggedInFetch, topPostsWeekNotLoggedInFetch, topPostsMonthNotLoggedInFetch, topPostsAlltimeNotLoggedInFetch} from '../fetch_functions/homePageFetchFunctions.js'

import {postInformationSection, commentInformationSection} from '../fetch_functions/singlePostFetch.js'

import {subredditIdFromName} from '../fetch_functions/subredditPageFetchFunctions.js'

import authenticateJWT from '../middleware/jwt_middleware.js'

// Dashboard page once logged in. Sort by dropdown: new, top today, this week, this month, all time. 


// pagination 
// https://mui.com/material-ui/react-pagination/

// Searches through the subreddits the unique user id is subscribed to. Takes subreddit logo & name
// 10 most recent posts of any subreddit subscribed to, name of post, post information (limited amount say if it is text)
// amount of upvotes, amount of comments, when the post was made (current date - date added)




router.get('/home/loggedin/new', authenticateJWT, async(req,res) => {

    try{
        const userId = req.user.id
        //skip is passed as a req.query.
        const {skip} = req.query

        const mostRecentPosts = await newPostsFetch(userId, parseInt(skip))

        res.status(200).json(mostRecentPosts)


    }catch(error){
        res.status(500).send(`Error fetching most recent posts: ${error}`)
    }
    }
),

router.get('/home/loggedin/topToday', authenticateJWT, async(req, res) => {

    try{
        const userId = req.user.id
        const {skip} = req.query

        const topTodayPosts = await topPostsTodayFetch(userId, parseInt(skip))

        res.status(200).json(topTodayPosts)
    }catch(error){
        res.status(500).send(`Error fetching top posts for today: ${error}`)
    }


}),

router.get('/home/loggedin/topWeek', authenticateJWT, async(req, res) => {

    try{
        const userId = req.user.id
        const {skip} = req.query

        const topWeekPosts = await topPostsWeekFetch(userId, parseInt(skip))

        res.status(200).json(topWeekPosts)
    }catch(error){
        res.status(500).send(`Error fetching top posts for week: ${error}`)
    }


}),

router.get('/home/loggedin/topMonth', authenticateJWT, async(req, res) => {

    try{
        const userId = req.user.id
        const {skip} = req.query

        const topMonthPosts = await topPostsMonthFetch(userId, parseInt(skip))

        res.status(200).json(topMonthPosts)
    }catch(error){
        res.status(500).send(`Error fetching top posts for month: ${error}`)
    }


}),

router.get('/home/loggedin/topAlltime', authenticateJWT, async(req, res) => {

    try{
        const userId = req.user.id
        const {skip} = req.query

        const topAlltimePosts = await topPostsAlltimeFetch(userId, parseInt(skip))

        res.status(200).json(topAlltimePosts)
    }catch(error){
        res.status(500).send(`Error fetching top posts for all time: ${error}`)
    }


}),


router.get('/home/notloggedin/new', async(req,res) => {

    try{
        const {skip} = req.query

        const mostRecentPosts = await newPostsNotLoggedInFetch(parseInt(skip))

        res.status(200).json(mostRecentPosts)


    }catch(error){
        res.status(500).send(`Error fetching most recent posts: ${error}`)
    }
    }
),


router.get('/home/notloggedin/topToday', async(req, res) => {

    try{
        const {skip} = req.query
        

        const topTodayPosts = await topPostsTodayNotLoggedInFetch(parseInt(skip))

        res.status(200).json(topTodayPosts)

    }catch(error){
        res.status(500).send(`Error fetching top posts for today: ${error}`)
    }


}),

router.get('/home/notloggedin/topWeek', async(req, res) => {

    try{
        const {skip} = req.query

        const topWeekPosts = await topPostsWeekNotLoggedInFetch(parseInt(skip))

        res.status(200).json(topWeekPosts)

    }catch(error){
        res.status(500).send(`Error fetching top posts for week: ${error}`)
    }


}),

router.get('/home/notloggedin/topMonth', async(req, res) => {

    try{
        const {skip} = req.query

        const topMonthPosts = await topPostsMonthNotLoggedInFetch(parseInt(skip))

        res.status(200).json(topMonthPosts)

    }catch(error){
        res.status(500).send(`Error fetching top posts for month: ${error}`)
    }


}),

router.get('/home/notloggedin/topAlltime', async(req, res) => {

    try{
        const {skip} = req.query

        const topAlltimePosts = await topPostsAlltimeNotLoggedInFetch(parseInt(skip))

        res.status(200).json(topAlltimePosts)
        
    }catch(error){
        res.status(500).send(`Error fetching top posts for all time: ${error}`)
    }


}),


router.get('/singlepostview/commentinfo/:postId', async(req,res) => {
    
    const {postId} = req.params

    const parsedPostId = parseInt(postId)

    try{

        const commentInfo = await commentInformationSection(parsedPostId)
        
        if(!commentInfo){
            return res.status(404).json({message: 'No comment information found.'})
        }

        res.status(200).json(commentInfo)
    }catch(error){
        console.log(`Error obtaining comment information ${error}`)
        res.status(500).json('Internal server error')
    }
})

router.get('/singlepostview/postinfo/:postId', async(req,res) => {
    
    
    const {postId} = req.params
    const parsedPostId = parseInt(postId)


    try{

        
        const postInfo = await postInformationSection(parsedPostId)

        if(!postInfo){
            return res.status(404).json({message :'No post information found.'})
        }


        res.status(200).json(postInfo)

    }catch(error){
        console.log(`Error obtaining post information ${error}`)
        //status 500 meaning request was unsuccessful
        res.status(500).json(`Internal server error.`)
    }
    }
)


router.post('/singlepostview/vote', async(req,res) => {

        const {postId, hasUpvoted, hasDownvoted} = req.body



    try{

            let vote;

            if(hasUpvoted){
                 vote = await prisma.post.update({
                    where:{
                        id: postId
                    },
                    data:{
                        upvotes:{
                            increment: 1
                        },
                    },
                })
            }else if(hasDownvoted){
                 vote = await prisma.post.update({
                    where:{
                        id: postId
                    },
                    data:{
                        upvotes:{
                            decrement: 1
                        }
                    }
                })
            }


        if(vote && hasUpvoted){
            return res.status(200).json({message: 'Upvote has been successfully sent to the server and updated.'})
        }

        if(vote && hasDownvoted){
            return res.status(200).json({message: 'Downvote has been successfully sent to the server and updated.'})
        }

            


    }catch(error){
        console.log(`Error posting the type of vote to the server via rest API ${error}`)
    }
})

router.post('/upload/text', authenticateJWT, async (req, res) => {
    try {
        // Extract the user ID from the authentication middleware (assumes `authenticateJWT` attaches user info to req.user)
        const userId = req.user.id;

        const { titleOfPost, bodyOfPost, subredditName} = req.body;

        if (!subredditName && !titleOfPost && !bodyOfPost) {
            return res.status(400).json({ error: 'Subreddit, title, and body are all required.' });
        }

        if (!subredditName && !titleOfPost && bodyOfPost) {
            return res.status(400).json({ error: 'Subreddit and title are required.' });
        }

        if (!subredditName && titleOfPost && !bodyOfPost) {
            return res.status(400).json({ error: 'Subreddit and body are required.' });
        }

        if (subredditName && !titleOfPost && !bodyOfPost) {
            return res.status(400).json({ error: 'Title and body are required.' });
        }

        if (!subredditName && titleOfPost && bodyOfPost) {
            return res.status(400).json({ error: 'Subreddit is required.' });
        }

        if (subredditName && !titleOfPost && bodyOfPost) {
            return res.status(400).json({ error: 'Title is required.' });
        }

        if (subredditName && titleOfPost && !bodyOfPost) {
            return res.status(400).json({ error: 'Body is required.' });
        }
        
        const subredditId = await subredditIdFromName(subredditName)
        console.log(subredditId)

        const postUpload = await prisma.post.create({

            data:{
                title: titleOfPost,
                dateAdded: new Date(),
                postInformation: bodyOfPost,
                upvotes: 1,
                subredditId: parseInt(subredditId),
                authorId: parseInt(userId),
      
        }}
    )

        
        console.log('Adding new post to database:', postUpload);

        return res.status(201).json({ message: 'Post created successfully.', post: postUpload });

    } catch (error) {
        console.error('Error in /upload/text:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});


    
    
router.post('/upload/image', authenticateJWT, async (req, res) => {
    try {
        // Extract the user ID from the authentication middleware (assumes `authenticateJWT` attaches user info to req.user)
        const userId = req.user.id;
        console.log(userId, parseInt(userId))

        const { titleOfPost, bodyOfPost, subredditName, photoLink} = req.body;

        if (!subredditName && !titleOfPost && !bodyOfPost) {
            return res.status(400).json({ error: 'Subreddit, title, and body are all required.' });
        }

        if (!subredditName && !titleOfPost && bodyOfPost) {
            return res.status(400).json({ error: 'Subreddit and title are required.' });
        }

        if (!subredditName && titleOfPost && !bodyOfPost) {
            return res.status(400).json({ error: 'Subreddit and body are required.' });
        }

        if (subredditName && !titleOfPost && !bodyOfPost) {
            return res.status(400).json({ error: 'Title and body are required.' });
        }

        if (!subredditName && titleOfPost && bodyOfPost) {
            return res.status(400).json({ error: 'Subreddit is required.' });
        }

        if (subredditName && !titleOfPost && bodyOfPost) {
            return res.status(400).json({ error: 'Title is required.' });
        }

        if (subredditName && titleOfPost && !bodyOfPost) {
            return res.status(400).json({ error: 'Body is required.' });
        }

        if(!photoLink){
            return res.status(402).json({error: 'Url for image is required.'})
        }
        
        const subredditId = await subredditIdFromName(subredditName)

        if(subredditId){
            console.log(`Logging subreddit id: ${subredditId}`)
        }else{
            console.log('subreddit id not found.')
        }
        

        const postUpload = await prisma.post.create({
            data:{
                title: titleOfPost,
                dateAdded: new Date(),
                postInformation: bodyOfPost,
                fileUrl: photoLink,
                upvotes: 1,
                subredditId: parseInt(subredditId),
                authorId: parseInt(userId)
            }
        })

        
        console.log('Adding new post to database:', postUpload);

        return res.status(201).json({ message: 'Post created successfully.', post: postUpload });

    } catch (error) {
        console.error('Error in /upload/image:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

router.post('/upload/article', authenticateJWT, async(req,res) => {
    
    try {
        // Extract the user ID from the authentication middleware (assumes `authenticateJWT` attaches user info to req.user)
        const userId = req.user.id;

        const { titleOfPost, bodyOfPost, subredditName, photoLink, articleLink} = req.body;

        if (!subredditName && !titleOfPost && !bodyOfPost) {
            return res.status(400).json({ error: 'Subreddit, title, and body are all required.' });
        }

        if (!subredditName && !titleOfPost && bodyOfPost) {
            return res.status(400).json({ error: 'Subreddit and title are required.' });
        }

        if (!subredditName && titleOfPost && !bodyOfPost) {
            return res.status(400).json({ error: 'Subreddit and body are required.' });
        }

        if (subredditName && !titleOfPost && !bodyOfPost) {
            return res.status(400).json({ error: 'Title and body are required.' });
        }

        if (!subredditName && titleOfPost && bodyOfPost) {
            return res.status(400).json({ error: 'Subreddit is required.' });
        }

        if (subredditName && !titleOfPost && bodyOfPost) {
            return res.status(400).json({ error: 'Title is required.' });
        }

        if (subredditName && titleOfPost && !bodyOfPost) {
            return res.status(400).json({ error: 'Body is required.' });
        }

        if(!photoLink){
            return res.status(402).json({error: 'Url for image is required.'})
        }

        if(!articleLink){
            return res.status(403).json({error: 'Url for article is required.'})
        }
        
        const subredditId = await subredditIdFromName(subredditName)

        const postUpload = await prisma.post.create({
            
            data:{
                title: titleOfPost,
                dateAdded: new Date(),
                postInformation: bodyOfPost,
                fileUrl: photoLink,
                articleLink: articleLink,
                upvotes: 1,
                subredditId: parseInt(subredditId),
                authorId: parseInt(userId)
            }
        })

        
        console.log('Adding new post to database:', postUpload);

        return res.status(201).json({ message: 'Post created successfully.', post: postUpload });

    } catch (error) {
        console.error('Error in /upload/image:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
})







export default router