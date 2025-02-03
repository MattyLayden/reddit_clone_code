import prisma from '../prisma/prismaClient.js'



async function findMostRecentPost(userId){

    try{

        const postId = await prisma.post.findFirst({

            where:{
                authorId: userId
            },
            orderBy:{
                dateAdded: 'desc'
            },
            select:{
                id: true
            }

        })

        return postId

    }catch(error){
        console.log(`Error finding most recent post Id ${error}`)
    }


}


export default findMostRecentPost