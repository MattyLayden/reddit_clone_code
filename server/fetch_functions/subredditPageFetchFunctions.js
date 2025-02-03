import timeAgo from '../utils/generalFunctions.js'

import prisma from '../prisma/prismaClient.js'


export async function subredditsSearchBar(){

    //need to put in amount of subreddit name/icon fetched.
    try{

        const basicInfo = await prisma.subreddit.findMany({
            select:{
                name: true,
                icon: true
            },
            take: 100
        })

        return basicInfo

    }catch(error){
        console.log(`Error obtaining subreddits for search bar. ${error}`)
    }

}

export async function subredditIdFromName(subredditName) {
    console.log('Entering subreddit id from name function the following is subredditname ....')
    console.log(subredditName); 
    
    
    try {
        const idFromName = await prisma.subreddit.findFirst({
            where: {
                name: {
                    equals: subredditName, 
                    mode: "insensitive"  
                    
                }
            },
            select: {
                id: true
            }
        });

        if (!idFromName) {
            console.log(`No subreddit found with name: ${subredditName}`); 
            return null;
        }

        console.log(idFromName.id)
        console.log('---------')
        console.log(idFromName); 
        return idFromName.id;
    } catch (error) {
        console.log(`Error obtaining subreddit id from name: ${error}`);
        throw error;
    }
}



export async function basicInformation(subredditName){

    try{

        const basicInfo = await prisma.subreddit.findFirst({
            where:{
                name: subredditName
            },
            select:{
                name: true,
                icon: true,
                description: true,
                _count:{
                    select:{
                        subscribedUsers: true
                    }
                }
            }
        })

        return basicInfo

    }catch(error){
        console.log(`Error obtaining basic information for the subreddit. ${error}`)
    }

}



export async function userSubscribed(currentSubredditId, userId){

    try{

        const userSubscribed = await prisma.user.findFirst({
            where:{
                id: userId,
                subscribedSubreddits:{
                    some:{
                        id: currentSubredditId
                    }
                }
            }
        })

        // !! changes the entire user object that satisfies the conditions to a boolean true/false(true if object exists, false otherwise)
        return !!userSubscribed
    }catch(error){
        console.log(`Error fetching if user is subscribed to subreddit : ${error}`)
    }

}

export async function newPostsFetch(currentSubredditId, skip){


    try{
        const newPostInformation = await prisma.post.findMany({
            take: 10,
            skip: skip,
            orderBy:{
                dateAdded: 'desc'
            },
            where:{
                subredditId: currentSubredditId
            },
            select:{
                id: true,
                title: true,
                dateAdded: true,
                postInformation: true,
                fileUrl: true,
                articleLink: true,
                upvotes: true,
                author:{
                    select:{
                        username: true,
                        icon: true
                    }
                },
                _count:{
                    select:{
                        comments: true
                    }
                }
            }
        })

        const recentPostsWithWhenAdded = newPostInformation.map(post => {
            return {
                ...post,
                whenAdded: timeAgo(post.dateAdded)
            }
        })

        return recentPostsWithWhenAdded

    }catch(error){
        console.log(`Error finding new post information: ${error}`)
    }
}

export async function topTodayFetch(currentSubredditId, skip){

    const currentTime = new Date();
    const oneDayAgo = new Date(currentTime - 24 * 60 * 60 * 1000);

    try{
        const topPostsTodayInformation = await prisma.post.findMany({

            take: 10,
            skip: skip,
            orderBy:{
                upvotes: 'desc'
            },
            where: {
                dateAdded:{
                    gte: oneDayAgo
                },
                subredditId: currentSubredditId
            },
            select:{
                id: true,
                title: true,
                dateAdded: true,
                postInformation: true,
                fileUrl: true,
                articleLink: true,
                upvotes: true,
                author:{
                    select:{
                        username: true,
                        icon: true
                    }
                },
                _count:{
                    select:{
                        comments: true
                    }
                }
            }

        })

        const topPostsTodayWithWhenAdded = topPostsTodayInformation.map(post => {
            return {
                ...post,
                whenAdded: timeAgo(post.dateAdded)
            }
        })

        return topPostsTodayWithWhenAdded

    }catch(error){
        console.log(`Error finding top today post information: ${error}`)
    }
}

export async function topWeekFetch(currentSubredditId, skip){

    const currentTime = new Date();
    const oneWeekAgo = new Date(currentTime - 7 * 24 * 60 * 60 * 1000);

    try{
        const topPostsWeekInformation = await prisma.post.findMany({

            take: 10,
            skip: skip,
            orderBy:{
                upvotes: 'desc'
            },
            where: {
                dateAdded:{
                    gte: oneWeekAgo
                },
                subredditId: currentSubredditId
            },
            select:{
                id: true,
                title: true,
                dateAdded: true,
                postInformation: true,
                fileUrl: true,
                articleLink: true,
                upvotes: true,
                author:{
                    select:{
                        username: true,
                        icon: true
                    }
                },
                _count:{
                    select:{
                        comments: true
                    }
                }
            }

        })

        const topPostsWeekWithWhenAdded = topPostsWeekInformation.map(post => {
            return {
                ...post,
                whenAdded: timeAgo(post.dateAdded)
            }
        })

        return topPostsWeekWithWhenAdded

    }catch(error){
        console.log(`Error finding top week post information: ${error}`)
    }
}

export async function topMonthFetch(currentSubredditId, skip){

    const currentTime = new Date();
    const oneMonthAgo = new Date(currentTime - 30 * 24 * 60 * 60 * 1000);


    try{

        

        const topPostsMonthInformation = await prisma.post.findMany({

            take: 10,
            skip: skip,
            orderBy:{
                upvotes: 'desc'
            },
            where: {
                dateAdded:{
                    gte: oneMonthAgo
                },
                subredditId: currentSubredditId
            },
            select:{
                id: true,
                title: true,
                dateAdded: true,
                postInformation: true,
                fileUrl: true,
                articleLink: true,
                upvotes: true,
                author:{
                    select:{
                        username: true,
                        icon: true
                    }
                },
                _count:{
                    select:{
                        comments: true
                    }
                }
            }

        })

        const topPostsMonthWithWhenAdded = topPostsMonthInformation.map(post => {
            return {
                ...post,
                whenAdded: timeAgo(post.dateAdded)
            }
        })

        return topPostsMonthWithWhenAdded

        // e.g. will return [{title(string), date(datetime), postinfo(string), upvotes(number),  whenAdded:        }]

    }catch(error){
        console.log(`Error obtaining top posts this month from server : ${error}`)
    }

}

export async function topAlltimeFetch(currentSubredditId, skip){

    try{

        const topPostsTodayInformation = await prisma.post.findMany({

            take: 10,
            skip: skip,
            orderBy:{
                upvotes: 'desc'
            },
            where: {
                subredditId: currentSubredditId
            },
            select:{
                id: true,
                title: true,
                dateAdded: true,
                postInformation: true,
                fileUrl: true,
                articleLink: true,
                upvotes: true,
                author:{
                    select:{
                        username: true,
                        icon: true
                    }
                },
                _count:{
                    select:{
                        comments: true
                    }
                }
            }

        })

        const topPostsAlltimeWithWhenAdded = topPostsTodayInformation.map(post => {
            return {
                ...post,
                whenAdded: timeAgo(post.dateAdded)
            }
        })

        return topPostsAlltimeWithWhenAdded

        // e.g. will return [{title(string), date(datetime), postinfo(string), upvotes(number),  whenAdded:        }]

    }catch(error){
        console.log(`Error obtaining top posts from all time from server : ${error}`)
    }

}

