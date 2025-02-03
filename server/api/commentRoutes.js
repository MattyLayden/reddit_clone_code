import express from 'express'

const router = express.Router();

import prisma from '../prisma/prismaClient.js'

import timeAgo from '../utils/generalFunctions.js'

import authenticateJWT from '../middleware/jwt_middleware.js';

function comparePostAndCommentDates(commentsArray, postsArray){

    const combinedArray = [...commentsArray, ...postsArray];

    function sortCommentsByDate(comments) {
        return comments.sort((a, b) => {
          const dateA = new Date(a.dateAdded);
          const dateB = new Date(b.dateAdded);
          return dateB - dateA; 
        });
      }
      
      const sortedComments = sortCommentsByDate(combinedArray);
      
      return sortedComments

}

function allNotifs(commentsArray, postsArray){

    const tenMostRecent = comparePostAndCommentDates(commentsArray, postsArray);

    return tenMostRecent

}

function fiveMostRecentOfAll(array1, array2){

    const tenMostRecent = comparePostAndCommentDates(array1, array2)

    return tenMostRecent.slice(0,5)


}


router.get('/notifBell', authenticateJWT, async(req, res) => {

    const Id = req.user.id;


    // Searches through the posts made by the user with id ':id'. It excludes the users own comments
    // but looks at the 5 most recent comments on the users posts. -> Returns : when comment was 
    // made, the info of the comment, the username of the author of the comment, and the subreddit name 
    // and the title of the parentPost made by the unique user id.

    try{
        const fiveMostRecentCommentsOnUserPosts = await prisma.comment.findMany({
        take: 5, 
        orderBy: {
            dateAdded: 'desc' 
        },
        where: {
            parentPost: {
                authorId: parseInt(Id) 
            },
            authorId: { 
                not: parseInt(Id)
            }
        },
        select: {
            dateAdded: true, 
            commentInformation: true, 
            author: {
                select: {
                    username: true,
                    icon: true 
                }
            },
            parentPost: {
                select: {
                    id: true,
                    title: true, 
                    subreddit: {
                        select: {
                            name: true 
                        }
                    }
                }
            }
        }



        });

        const recentPostRepliesWithWhenAdded = fiveMostRecentCommentsOnUserPosts.map(comment => {
            return {
                ...comment,
                whenAdded: timeAgo(comment.dateAdded)
            }
        })

    


    //Searches through the comments made by user with id ':id'. (Excludes own replies to own comment.) 
    // 5 most recent replies made to any comment made by the user. -> returns the reply comment information
    // the username of the reply, and the name of the subreddit the user comment was made in.

    const fiveMostRecentCommentReplies = await prisma.comment.findMany({
        take: 5, 
        orderBy: {
            dateAdded: 'desc' 
        },
        where: {
            parentComment: {
                authorId: parseInt(Id)
            },
            authorId: { 
                not: parseInt(Id)
            }
        },
        select: {
            dateAdded: true, 
            commentInformation: true, 
            author: {
                select: {
                    username: true 
                }
            },
            parentComment: {
                select: {
                    parentPost: {
                        select: {
                            id: true,
                            subreddit: {
                                select: {
                                    name: true 
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    const recentCommentRepliesWithWhenAdded = fiveMostRecentCommentReplies.map(comment => {
        return {
            ...comment,
            whenAdded: timeAgo(comment.dateAdded)
        }
    })

    res.json(fiveMostRecentOfAll(recentPostRepliesWithWhenAdded, recentCommentRepliesWithWhenAdded))

    }catch(error){
        res.json(`Server error: ${error}`)
    }


    
})



router.get('/allNotifs/:Id', async(req, res) => {

    const {Id} = req.params;


    // Searches through the posts made by the user with id ':id'. It excludes the users own comments
    // but looks at the 5 most recent comments on the users posts. -> Returns : when comment was 
    // made, the info of the comment, the username of the author of the comment, and the subreddit name 
    // and the title of the parentPost made by the unique user id.


    try{

    
    const fiveMostRecentCommentsOnUserPosts = await prisma.comment.findMany({
        take: 5, 
        orderBy: {
            dateAdded: 'desc' 
        },
        where: {
            parentPost: {
                authorId: parseInt(Id) 
            },
            authorId: { 
                not: parseInt(Id)
            }
        },
        select: {
            dateAdded: true, 
            commentInformation: true, 
            author: {
                select: {
                    username: true 
                }
            },
            parentPost: {
                select: {
                    title: true, 
                    subreddit: {
                        select: {
                            name: true 
                        }
                    }
                }
            }
        }

    });
    


    //Searches through the comments made by user with id ':id'. (Excludes own replies to own comment.) 
    // 5 most recent replies made to any comment made by the user. -> returns the reply comment information
    // the username of the reply, and the name of the subreddit the user comment was made in.

    const fiveMostRecentCommentReplies = await prisma.comment.findMany({
        take: 5, 
        orderBy: {
            dateAdded: 'desc' 
        },
        where: {
            parentComment: {
                authorId: parseInt(Id)
            },
            authorId: { 
                not: parseInt(Id)
            }
        },
        select: {
            dateAdded: true, 
            commentInformation: true, 
            author: {
                select: {
                    username: true 
                }
            },
            parentComment: {
                select: {
                    parentPost: {
                        select: {
                            subreddit: {
                                select: {
                                    name: true 
                                }
                            }
                        }
                    }
                }
            }
        }
    });


    res.json(allNotifs(fiveMostRecentCommentReplies, fiveMostRecentCommentsOnUserPosts))

    }catch(error){
        res.json(`Server error: ${error}`)
    }
    
})

router.post('/:postId/makeComment', authenticateJWT, async(req,res) => {
    
    const {postId} = req.params
    const parsedPostId = parseInt(postId)

    const userId = req.user.id
    
    const {comment} = req.body

    try{
        const addComment = await prisma.comment.create({
            data: {
                dateAdded: new Date(), // Use new Date() to set the current date
                commentInformation: comment,
                upvotes: 1,
                parentPostId: parsedPostId,
                authorId: parseInt(userId),
            },
        });

        if(addComment){
            return res.status(200).json({message: "Comment successfully added to server"})
        }
    }catch(error){
        console.log(`Unknown Error ${error}`)
    }

})


router.post('/:commentId/reply', authenticateJWT, async(req,res) => {
   
    const {commentId} = req.params
    const parsedCommentId = parseInt(commentId)

    const {newComment, postId} = req.body

    if(!postId){
        console.log(`Post id not receieved `)
    }

    const userId = req.user.id

    try{

        const addReply = await prisma.comment.create({
            data:{

            dateAdded: new Date(),
            commentInformation: newComment,
            upvotes: 1,
            parentPostId: postId,
            authorId: userId,
            parentCommentId: parsedCommentId,
            }
        })

        if(addReply){
            return res.status(200).json({message:"Reply successfully added to server via rest API.", reply: addReply})
        }

    }catch(error){
        console.log(`Unknown error ${error}`)
    }
    
})

router.get('/lastcommentid', async (req, res) => {
    try {
      const lastComment = await prisma.comment.findFirst({
        orderBy: {
          id: 'desc'
        },
        select: {
          id: true 
        }
      });
  
      if (lastComment) {
        res.status(200).json({ lastCommentId: lastComment.id });
      } else {
        res.status(404).json({ message: 'No comments found' });
      }
    } catch (error) {
      console.error('Error fetching last comment ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

export {router, comparePostAndCommentDates}