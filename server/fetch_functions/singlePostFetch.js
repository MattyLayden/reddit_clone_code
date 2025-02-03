import prisma from '../prisma/prismaClient.js'

import timeAgo from '../utils/generalFunctions.js'

export async function postInformationSection(postId) {
    try {
        const postInfo = await prisma.post.findFirst({
            where: {
                id: postId
            },
            select: {
                id: true,
                title: true,
                dateAdded: true,
                postInformation: true,
                fileUrl: true,
                articleLink: true,
                upvotes: true,
                subreddit: {
                    select: {
                        name: true,
                        icon: true
                    }
                },
                author: {
                    select: {
                        username: true
                    }
                },
                _count: {
                    select: {
                        comments: true
                    }
                }
            }
        });

        if (!postInfo) {
            return null; 
        }

        
        const postInfoWithWhenAdded = {
            ...postInfo,
            whenAdded: timeAgo(postInfo.dateAdded)
        };

        return postInfoWithWhenAdded;
    } catch (error) {
        console.log(`Error trying to obtain post information: ${error}`);
    }
}





// can maybe introduce a sort by new section if have time

export async function commentInformationSection(postId){

    try{
        const commentInfo = await prisma.comment.findMany({
            where:{
                parentPostId: postId
            },
            orderBy:{
                upvotes: 'desc'
            },
            select:{
                id: true,
                dateAdded: true,
                commentInformation: true,
                upvotes: true,
                author:{
                    select:{
                        username: true,
                        icon: true
                    }
                },
                parentCommentId: true,
                replies:{
                    select:{
                        dateAdded: true,
                        commentInformation: true,
                        upvotes: true,
                        author:{
                            select:{
                                username: true,
                                icon: true
                            }
                        }
                    }
                }

            }
        })

        const commentInfoWithDateAdded = commentInfo.map((comment) => {
            
            const updatedReplies = comment.replies.map((reply) => ({
              ...reply,
              whenAdded: timeAgo(reply.dateAdded), 
            }));
      
            return {
              ...comment,
              whenAdded: timeAgo(comment.dateAdded), 
              replies: updatedReplies, 
            };
          });

        return commentInfoWithDateAdded

    }catch(error){
        console.log(`Error trying to obtain comment information ${error}`)
    }

}

//if parentComment in array is true then function to display the 

