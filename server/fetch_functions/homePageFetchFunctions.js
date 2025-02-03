
import prisma from '../prisma/prismaClient.js'

import timeAgo from '../utils/generalFunctions.js'



// Dashboard page once logged in. Sort by dropdown: new, top today, this week, this month, all time. 


// pagination 
// https://mui.com/material-ui/react-pagination/

// Searches through the subreddits the unique user id is subscribed to. Takes subreddit logo & name
// 10 most recent posts of any subreddit subscribed to, name of post, post information (limited amount say if it is text)
// amount of upvotes, amount of comments, when the post was made (current date - date added)

export async function navBarUserDataFetch(userId){
    try{
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select:{
                username: true,
                icon: true
            }
        })

        return user
    }catch(error){
        console.log(`Error fetching username and icon from fetch function ${error}`)
    }
}


export async function subscribedSubFetch(userId){
    try{
        const subNameAndIcon = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select:{
                subscribedSubreddits:{
                    select:{
                        id: true,
                        name: true,
                        icon: true
                    }
                }
            }
        })

        return subNameAndIcon

    }catch(error){
        console.log(`Error fetching subscribed subreddit information: ${error}`)
    }
}



export async function newPostsFetch(userId, skip){

    try{
        //usersubs will return e.g. [{subreddit id: 1, name: literature, icon: book.jpg}, ...]

        const usersSubs = await subscribedSubFetch(userId);

        const usersSubsIds = usersSubs.subscribedSubreddits.map((subreddit) => subreddit.id)

        //take is amount on page, skip is pagination page number

        const newPostInformation = await prisma.post.findMany({
            take: 10,
            skip: skip,
            orderBy:{
                dateAdded: 'desc'
            },
            where:{
                subredditId:{
                    in: usersSubsIds,
                }

            },
            select:{
                id: true,
                title: true,
                dateAdded: true,
                postInformation: true,
                fileUrl: true,
                articleLink: true,
                upvotes: true,
                subreddit:{
                    select:{
                        name: true,
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

        // e.g. will return [{title(string), date(datetime), postinfo(string), upvotes(number),  whenAdded:        }]

    }catch(error){
        console.log(`Error obtaining new posts from server : ${error}`)
    }
}

export async function topPostsTodayFetch(userId, skip){

    const currentTime = new Date();
    const oneDayAgo = new Date(currentTime - 24 * 60 * 60 * 1000);


    try{

        const usersSubs = await subscribedSubFetch(userId);

        const usersSubsIds = usersSubs.subscribedSubreddits.map((subreddit) => subreddit.id)

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
                subredditId:{
                    in: usersSubsIds
                }
            },
            select:{
                id: true,
                title: true,
                dateAdded: true,
                postInformation: true,
                fileUrl: true,
                articleLink: true,
                upvotes: true,
                subreddit:{
                    select:{
                        name: true,
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

        // e.g. will return [{title(string), date(datetime), postinfo(string), upvotes(number),  whenAdded:        }]

    }catch(error){
        console.log(`Error obtaining top posts today from server : ${error}`)
    }

}


export async function topPostsWeekFetch(userId, skip){

    const currentTime = new Date();
    const oneWeekAgo = new Date(currentTime - 7 * 24 * 60 * 60 * 1000);


    try{

        const usersSubs = await subscribedSubFetch(userId);

        const usersSubsIds = usersSubs.subscribedSubreddits.map((subreddit) => subreddit.id)

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
                subredditId:{
                    in: usersSubsIds
                }
            },
            select:{
                id: true,
                title: true,
                dateAdded: true,
                postInformation: true,
                fileUrl: true,
                articleLink: true,
                upvotes: true,
                subreddit:{
                    select:{
                        name: true,
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

        // e.g. will return [{title(string), date(datetime), postinfo(string), upvotes(number),  whenAdded:        }]

    }catch(error){
        console.log(`Error obtaining top posts this week from server : ${error}`)
    }

}

export async function topPostsMonthFetch(userId, skip){

    const currentTime = new Date();
    const oneMonthAgo = new Date(currentTime - 30 * 24 * 60 * 60 * 1000);


    try{

        const usersSubs = await subscribedSubFetch(userId);

        const usersSubsIds = usersSubs.subscribedSubreddits.map((subreddit) => subreddit.id)

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
                subredditId:{
                    in: usersSubsIds
                }
            },
            select:{
                id: true,
                title: true,
                dateAdded: true,
                postInformation: true,
                fileUrl: true,
                articleLink: true,
                upvotes: true,
                subreddit:{
                    select:{
                        name: true,
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

        // e.g. will return [{title(string), date(datetime), postinfo(string), fileUrl(string) if included, articleLink(string) if included upvotes(number),  comment amount(number) whenAdded:(hours ago) }]

    }catch(error){
        console.log(`Error obtaining top posts this month from server : ${error}`)
    }

}

export async function topPostsAlltimeFetch(userId, skip){

    try{

        const usersSubs = await subscribedSubFetch(userId);

        const usersSubsIds = usersSubs.subscribedSubreddits.map((subreddit) => subreddit.id)

        const topPostsTodayInformation = await prisma.post.findMany({

            take: 10,
            skip: skip,
            orderBy:{
                upvotes: 'desc'
            },
            where: {
                subredditId:{
                    in: usersSubsIds
                }
            },
            select:{
                id: true,
                title: true,
                dateAdded: true,
                postInformation: true,
                fileUrl: true,
                articleLink: true,
                upvotes: true,
                subreddit:{
                    select:{
                        name: true,
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



export async function newPostsNotLoggedInFetch(skip){

    try{
        

        //take is amount on page, skip is pagination page number

        const newPostInformation = await prisma.post.findMany({
            take: 10,
            skip: skip,
            orderBy:{
                dateAdded: 'desc'
            },
            select:{
                id: true,
                title: true,
                dateAdded: true,
                postInformation: true,
                fileUrl: true,
                articleLink: true,
                upvotes: true,
                subreddit:{
                    select:{
                        name: true,
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

        // e.g. will return [{title(string), date(datetime), postinfo(string), upvotes(number),  whenAdded:        }]

    }catch(error){
        console.log(`Error obtaining new posts from server : ${error}`)
    }
}


export async function topPostsTodayNotLoggedInFetch(skip){

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
            },
            select:{
                id: true,
                title: true,
                dateAdded: true,
                postInformation: true,
                fileUrl: true,
                articleLink: true,
                upvotes: true,
                subreddit:{
                    select:{
                        name: true,
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

        // e.g. will return [{title(string), date(datetime), postinfo(string), upvotes(number),  whenAdded:        }]

    }catch(error){
        console.log(`Error obtaining top posts today from server : ${error}`)
    }

}


export async function topPostsWeekNotLoggedInFetch(skip){

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
                }
            },
            select:{
                id: true,
                title: true,
                dateAdded: true,
                postInformation: true,
                fileUrl: true,
                articleLink: true,
                upvotes: true,
                subreddit:{
                    select:{
                        name: true,
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

        // e.g. will return [{title(string), date(datetime), postinfo(string), upvotes(number),  whenAdded:        }]

    }catch(error){
        console.log(`Error obtaining top posts this week from server : ${error}`)
    }

}


export async function topPostsMonthNotLoggedInFetch(skip){

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
                }
            },
            select:{
                id: true,
                title: true,
                dateAdded: true,
                postInformation: true,
                fileUrl: true,
                articleLink: true,
                upvotes: true,
                subreddit:{
                    select:{
                        name: true,
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

        // e.g. will return [{title(string), date(datetime), postinfo(string), fileUrl(string) if included, articleLink(string) if included upvotes(number),  comment amount(number) whenAdded:(hours ago) }]

    }catch(error){
        console.log(`Error obtaining top posts this month from server : ${error}`)
    }

}


export async function topPostsAlltimeNotLoggedInFetch(skip){

    try{

        const topPostsInformation = await prisma.post.findMany({

            take: 10,
            skip: skip,
            orderBy:{
                upvotes: 'desc'
            },
            select:{
                id: true,
                title: true,
                dateAdded: true,
                postInformation: true,
                fileUrl: true,
                articleLink: true,
                upvotes: true,
                subreddit:{
                    select:{
                        name: true,
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

        const topPostsAlltimeWithWhenAdded = topPostsInformation.map(post => {
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
