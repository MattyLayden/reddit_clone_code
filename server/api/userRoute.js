import express from 'express'

const router = express.Router();

import prisma from '../prisma/prismaClient.js'

import {userIdFromUsername, subscribedSubFetch, newCommentsFetch, topCommentsFetch, newPostsFetch, topPostsFetch, compareUpvotes, newAllFetch, topAllFetch} from '../fetch_functions/userPageFetchFunctions.js'

import authenticateJWT from '../middleware/jwt_middleware.js';

import { navBarUserDataFetch } from '../fetch_functions/homePageFetchFunctions.js';

import {subredditIdFromName} from '../fetch_functions/subredditPageFetchFunctions.js'

// routes

router.get('/:user/all/new/', async(req, res) => {
    
    const {skip} = req.query
    const {user} = req.params
    

    const parsedSkip = parseInt(skip)

    try{

        const userId = await userIdFromUsername(user)
        
        console.log(`Fetching data for userId ${userId}`)

         
        const mostRecentAll = await newAllFetch(userId, parsedSkip);
        if(mostRecentAll){
            res.status(200).json(mostRecentAll)
        }else{
            res.status(404).json({error: '404 error at rest api'})
        }

    }catch(error){
        res.status(500).send(`Error fetching most recent all internal server error${error}`)
    }

})
//user replying to a comment or post
//sub icon, subname - title of post, username of user replied to comment author, when, upvotes

//user post

router.get('/:user/all/top', async(req, res) => {
    
    const {skip} = req.query
    const {user} = req.params

    
    const parsedSkip = parseInt(skip)

    try{

        const userId = await userIdFromUsername(user)
        
        console.log(`Fetching data for userId ${userId}`)


        const topAll = await topAllFetch(userId, parsedSkip);

        if(topAll){
            res.status(200).json(topAll)
        }else{
            res.status(404).json({error: '404 error at reast api'})
        }

   
    }catch(error){
        res.status(500).send(`Error fetching top all internal server error ${error}`)
    }

})


router.get('/:user/posts/new', async(req, res) => {
    
    const {user} = req.params
    
    const {skip} = req.query

    const parsedSkip = parseInt(skip)

    try{

        const userId = await userIdFromUsername(user)
        
        console.log(`Fetching data for userId ${userId}`)


        const mostRecentPosts = await newPostsFetch(userId, parsedSkip);

        if(mostRecentPosts){
            res.status(200).json(mostRecentPosts)
        }else{
            res.status(404).json({error: '404 error at rest api'})
        }

    }catch(error){
        res.status(500).send(`Error fetching most recent posts internal server error${error}`)
    }

})

router.get('/:user/posts/top', async(req, res) => {
    
    const {user} = req.params
    const userId = userIdFromUsername(user)

    const {skip} = req.query
    const parsedSkip = parseInt(skip)

    try{

        const userId = await userIdFromUsername(user)
        
        console.log(`Fetching data for userId ${userId}`)

        const topPosts = await topPostsFetch(userId, parsedSkip);

        if(topPosts){
            res.status(200).json(topPosts)
        }else{
            res.status(404).json({error: '404 error at rest api'})
        }

    }catch(error){
        res.status(500).send(`Error fetching top posts internal server error${error}`)
    }

})

router.get('/:user/new', async(req, res) => {
    
    const {user} = req.params
    
    const {skip} = req.query

    const parsedSkip = parseInt(skip)

    try{

        const userId = await userIdFromUsername(user)
        
        console.log(`Fetching data for userId ${userId}`)


        const mostRecentComments = await newCommentsFetch(userId, parsedSkip);

        if(mostRecentComments){
            res.status(200).json(mostRecentComments)
        }else{
            res.status(404).json({error: '404 error at rest api'})
        }

       

    }catch(error){
        res.status(500).send(`Error fetching most recent posts internal server error ${error}`)
    }

})

router.get('/:user/comment/top', async(req, res) => {
    
    const {skip} = req.query
    const {user} = req.params

    const parsedSkip = parseInt(skip)

    try{

        const userId = await userIdFromUsername(user)
        
        console.log(`Fetching data for userId ${userId}`)


        const topComments = await topCommentsFetch(userId, parsedSkip);

        if(topComments){
            res.status(200).json(topComments)
        }else{
            res.status(404).json({error: '404 error at rest api'})
        }

    }catch(error){
        res.status(500).send(`Error fetching most recent posts internal server error ${error}`)
    }

})


router.get(`/recentlyvisited`, authenticateJWT, async(req,res) => {

    //only 5 maximum in the array
    try{
        const userId = req.user.id

        const response = await prisma.user.findFirst({
            where:{
                id: parseInt(userId)
            },
            select:{
                recentSubs: true
            }

        })

        if(response){
            return res.status(200).json(response)

        }else{
            return res.status(404).json('Error obtaining recently visited')
        }


    }catch(error){
        res.status(500)
        return console.log(`Error ${error}`)
    }
})


router.get('/homeProfileData', authenticateJWT, async(req, res) => {

    try{
        const userId = req.user.id

        const userData = await navBarUserDataFetch(userId)

        if(userData){
            return res.status(200).json({username: userData.username, icon: userData.icon})
        }else{
            return res.status(500).json({error: `Error obtaining userData via navBarUserDataFetch`})
        }

    }catch(error){
        return console.log(`Error obtaining userIcon`)
    }
})


router.get('/questionmark', async(req, res) => {

    try{
        const response = await prisma.miscellaneous.findFirst({
            where:{
                id: 6
            },
            select:{
                photo_links: true
            }
        })

        if(response){
            res.status(200).json({questionImage: response.photo_links})
        }else{
            res.status(500).json({error: 'Error obtaining question mark image via rest api.'})
        }
    }catch(error){
        console.log(`Error obtaining question image: Unknown error ${error}`)
    }
})


router.get('/:subreddit/isSubscribed', authenticateJWT, async (req, res) => {
    const { subreddit } = req.params;

    const subredditId = await subredditIdFromName(subreddit);

    if (!subredditId) {
        return res.status(404).json({ message: `Subreddit ${subreddit} not found` });
    }

    console.log(`Checking if user is authenticated...`); 
    if (!req.user) {
        console.warn("User not authenticated"); 
        return res.status(401).json({ message: "User is not logged in" });
    }

    try {
        const userId = req.user.id;

        const userSubscribed = await prisma.user.findFirst({
            where: {
                id: userId,
                subscribedSubreddits: {
                    some: {
                        id: subredditId,
                    },
                },
            },
        });

        if (userSubscribed) {
            return res.status(200).json({ message: `User is subscribed to ${subreddit}` });
        } else {
            return res.status(404).json({ message: `User is not subscribed to ${subreddit}` });
        }
    } catch (error) {
        console.error(`Error checking subscription: ${error.message}`);
        return res.status(500).json({ message: "Internal server error" });
    }
});


router.post('/:subreddit/unsubscribe', authenticateJWT, async (req, res) => {
    const { subreddit } = req.params;

    try {
        
        const subredditId = await subredditIdFromName(subreddit);

        
        if (!subredditId) {
            return res.status(404).json({ message: `Subreddit ${subreddit} not found` });
        }

        const userId = req.user.id;

        if (userId) {
            
            await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    subscribedSubreddits: {
                        disconnect: {
                            id: subredditId,
                        },
                    },
                },
            });

            
            res.status(200).json({ message: `User has successfully unsubscribed from ${subreddit}` });
        } else {
          
            res.status(401).json({ message: 'User is not authenticated' });
        }
    } catch (error) {

        console.log(`Error: ${error}`);
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
});


router.post('/:subreddit/subscribe', authenticateJWT, async (req, res) => {
    const { subreddit } = req.params;

    try {
        
        const subredditId = await subredditIdFromName(subreddit);

        
        if (!subredditId) {
            return res.status(404).json({ message: `Subreddit ${subreddit} not found` });
        }

        const userId = req.user.id;

        if (userId) {
            
            await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    subscribedSubreddits: {
                        connect: {
                            id: subredditId,
                        },
                    },
                },
            });

            
            res.status(200).json({ message: `User has successfully subscribed to ${subreddit}` });
        } else {
          
            res.status(401).json({ message: 'User is not authenticated' });
        }
    } catch (error) {

        console.log(`Error: ${error}`);
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
});



export default router