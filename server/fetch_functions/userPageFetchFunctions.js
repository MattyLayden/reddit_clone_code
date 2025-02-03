import prisma from '../prisma/prismaClient.js'

import timeAgo from '../utils/generalFunctions.js'


import {comparePostAndCommentDates} from '../api/commentRoutes.js'



// user page. Bar with 3 options. All, posts, comments, 
// see subreddits subscribed to button somewhere
// Username, post karma(total amount of upvotes on pots), comment karma(total amount of upvotes on comments)



export async function userIdFromUsername(username){

    try{
        const user = await prisma.user.findFirst({
            where:{
                username: username
            },
            select:{
                id: true
            }
        })

        if(user){
            return user.id
        }else{
            console.log(`No user found for username : ${username}`)
            
        }


    }catch(error){
        console.log(`Error obtaining user id from username ${username}`)
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



// comments

export async function newCommentsFetch(userId, skip){

    //user can comment on any post in any subreddit

    const parsedSkip = parseInt(skip)

    try{
        
        const newCommentInformation = await prisma.comment.findMany({

            take: 10,
            skip: parsedSkip,
            orderBy:{
                dateAdded: 'desc'
            },
            where:{
                authorId: userId
            },
            select:{
                parentPost:{
                    select:{
                        id: true,
                        title: true,
                        subreddit:{
                            select:{
                                name: true,
                                icon: true
                            }
                        }
                        
                    }
                },
                parentComment:{
                    select:{
                        author:{
                            select:{
                                username: true
                            }
                        }
                    }
                },
                upvotes: true,
                dateAdded: true,
                commentInformation: true
            }
        })

    

    const recentCommentsWithWhenAdded = newCommentInformation.map(post => {
        return {
            ...post,
            whenAdded: timeAgo(post.dateAdded)
        }
    })

    return recentCommentsWithWhenAdded

    

}catch(error){
    console.log(`Error obtaining comments from server : ${error}`)
}

}

export async function topCommentsFetch(userId, skip){

    //user can comment on any post in any subreddit

    const parsedSkip = parseInt(skip)

    try{
        
        const topCommentsInformation = await prisma.comment.findMany({

            take: 10,
            skip: parsedSkip,
            orderBy:{
                upvotes: 'desc'
            },
            where:{
                authorId: userId
            },
            select:{
                parentPost:{
                    select:{
                        title: true,
                        subreddit:{
                            select:{
                                name: true,
                                icon: true
                            }
                        }
                        
                    }
                },
                parentComment:{
                    select:{
                        author:{
                            select:{
                                username: true
                            }
                        }
                    }
                },
                upvotes: true,
                dateAdded: true,
                commentInformation: true
            }
        })

    

    const topCommentsWithWhenAdded = topCommentsInformation.map(post => {
        return {
            ...post,
            whenAdded: timeAgo(post.dateAdded)
        }
    })

    return topCommentsWithWhenAdded

    

}catch(error){
    console.log(`Error obtaining comments from server : ${error}`)
}

}





// posts 

export async function newPostsFetch(userId, skip){

    const parsedSkip = parseInt(skip)

    try{
       
        // user can post in any subreddit 

        //take is amount on page, skip is pagination page number

        const newPostInformation = await prisma.post.findMany({
            take: 10,
            skip: parsedSkip,
            orderBy:{
                dateAdded: 'desc'
            },
            where:{
                authorId: userId

            },
            select:{
                id: true,
                title: true,
                dateAdded: true,
                postInformation: true,
                fileUrl:true,
                articleLink: true,
                upvotes: true,
                subreddit:{
                    select:{
                        id: true,
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

        

    }catch(error){
        console.log(`Error obtaining new posts from server : ${error}`)
    }
}

export async function topPostsFetch(userId, skip){

    const parsedSkip = parseInt(skip)

    try{
       
        // user can post in any subreddit 

        //take is amount on page, skip is pagination page number

        const topPostsInformation = await prisma.post.findMany({
            take: 10,
            skip: parsedSkip,
            orderBy:{
                upvotes: 'desc'
            },
            where:{
                authorId: userId

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
                        id: true,
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

        const topPostsWithWhenAdded = topPostsInformation.map(post => {
            return {
                ...post,
                whenAdded: timeAgo(post.dateAdded)
            }
        })

        return topPostsWithWhenAdded

        

    }catch(error){
        console.log(`Error obtaining new posts from server : ${error}`)
    }
}



// all 

export function compareUpvotes(array1, array2){

    const combinedArray = [...array1, ...array2];

    function sortByUpvotes(combinedArray){
        return combinedArray.sort((a,b) => {
            const elementA = a.upvotes
            const elementB = b.upvotes
            return elementB-elementA
        })

    }

    return sortByUpvotes(combinedArray)

}  



export async function newAllFetch(userid, skip){

    try{

        const newComments = await newCommentsFetch(userid, skip);
        const newPosts = await newPostsFetch(userid, skip);

        const comparedDates = comparePostAndCommentDates(newComments, newPosts);

        return comparedDates

    }catch(error){
        console.log(`Error obtaining all newest posts/comments: ${error}`)
    }
}

export async function topAllFetch(userid, skip){

    try{

        const topComments = await topCommentsFetch(userid, skip);
        const topPosts = await topPostsFetch(userid, skip)

        const comparedUpvotes = compareUpvotes(topComments, topPosts)

        return comparedUpvotes

    }catch(error){
        console.log(`Error obtaining all top posts/comments ${error}`)
    }

}


