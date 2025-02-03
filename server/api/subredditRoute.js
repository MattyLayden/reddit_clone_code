import express from 'express'

const router = express.Router();

import authenticateJWT from '../middleware/jwt_middleware.js'

import {subredditsSearchBar, subredditIdFromName, basicInformation, userSubscribed, newPostsFetch, topTodayFetch, topWeekFetch, topMonthFetch, topAlltimeFetch} from '../fetch_functions/subredditPageFetchFunctions.js'
import prisma from '../prisma/prismaClient.js';


router.get('/:subreddit/usersubscribed', authenticateJWT, async(req,res) => {
   
    const userId = req.user.id

    try{
        const {subreddit} = req.params
        const subredditId = await subredditIdFromName(subreddit)
        const response = await userSubscribed(subredditId, userId)

        console.log(`Response from api ... user subscribed: ${response}`)

        if(response){
            res.status(201).json({response: response})
        }else{
            res.status(500)
        }

    }catch(error){
        console.log(`Error obtaining user subscribed? via fetch function within rest api.`)
    }
})


router.get('/searchbar', async(req,res) => {
    try{
        const searchbarSubs = await subredditsSearchBar()
        res.status(200).json(searchbarSubs)
    }catch(error){
        res.status(500).send(`Error fetching subreddits for searchbar ${error}`)
    }
})

router.get('/:subreddit/basicInfo', async(req,res) => {

    try{

        const {subreddit} = req.params

        const basicInfo = await basicInformation(subreddit)

        res.status(200).json(basicInfo)

    }catch(error){
        res.status(500).send(`Error obtaining subreddit information ${error}`)
    }
})

router.get('/:subreddit/new', async (req, res) => {
    try {
        const { subreddit } = req.params;
        const { skip } = req.query;
        
        const subredditId = await subredditIdFromName(subreddit);

        if (!subredditId) {
            return res.status(404).json({ message: "Subreddit not found" });
        }

        const mostRecentPosts = await newPostsFetch(parseInt(subredditId), parseInt(skip));

        res.status(200).json(mostRecentPosts);
    } catch (error) {
        res.status(500).send(`Error fetching most recent posts ${error}`);
    }
});


router.get('/:subreddit/topToday', async(req,res) => {

    try{
        const {subreddit} = req.params
        const {skip} = req.query

        const subredditId = await subredditIdFromName(subreddit);

        if (!subredditId) {
            return res.status(404).json({ message: "Subreddit not found" });
        }

        const topTodayPosts = await topTodayFetch(parseInt(subredditId), parseInt(skip))
        res.status(200).json(topTodayPosts)
    }catch(error){
        res.status(500).send(`Error fetching top today posts ${error}`)
    }
})

router.get('/:subreddit/topWeek', async(req,res) => {

    try{
        const {subreddit} = req.params
        const {skip} = req.query

        const subredditId = await subredditIdFromName(subreddit);

        if (!subredditId) {
            return res.status(404).json({ message: "Subreddit not found" });
        }

        const topWeekPosts = await topWeekFetch(parseInt(subredditId), parseInt(skip))
        res.status(200).json(topWeekPosts)
    }catch(error){
        res.status(500).send(`Error fetching most recent posts ${error}`)
    }
})

router.get('/:subreddit/topMonth', async(req,res) => {

    try{
        const {subreddit} = req.params
        const {skip} = req.query

        const subredditId = await subredditIdFromName(subreddit);

        if (!subredditId) {
            return res.status(404).json({ message: "Subreddit not found" });
        }

        const topMonthPosts = await topMonthFetch(parseInt(subredditId), parseInt(skip))
        res.status(200).json(topMonthPosts)
    }catch(error){
        res.status(500).send(`Error fetching top month posts ${error}`)
    }
})

router.get('/:subreddit/topAllTime', async(req,res) => {

    try{
        const {subreddit} = req.params
        const {skip} = req.query

        const subredditId = await subredditIdFromName(subreddit);

        if (!subredditId) {
            return res.status(404).json({ message: "Subreddit not found" });
        }
        
        const topAllTimePosts = await topAlltimeFetch(parseInt(subredditId), parseInt(skip))

        res.status(200).json(topAllTimePosts)
    }catch(error){
        res.status(500).send(`Error fetching top month posts ${error}`)
    }
})



router.post('/:subreddit/recentvisit', authenticateJWT, async (req, res) => {
    const { subreddit } = req.params;

    try {
        const userId = req.user.id;

        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
            select: { recentSubs: true },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let recentSubs = user.recentSubs || [];

        const existingIndex = recentSubs.indexOf(subreddit);
        if (existingIndex > -1) {
            recentSubs.splice(existingIndex, 1);
        }

        recentSubs.unshift(subreddit);

        if (recentSubs.length > 5) {
            recentSubs.pop();
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(userId) },
            data: { recentSubs: recentSubs },
        });

        if (!updatedUser) {
            return res.status(500).json({ message: 'Failed to update recentSubs' });
        }

        res.status(200).json({ message: 'Successfully added subreddit to recently visited' });
    } catch (error) {
        console.error(`Error updating recent visits:`, error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});




export default router