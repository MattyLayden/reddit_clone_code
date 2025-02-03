import prisma from '../prisma/prismaClient.js'



export async function uploadStringPost(userId, title, postInformation, subredditId){

    try{
        const post = await prisma.post.create({
            data:{
                title: title,
                dateAdded: new Date(),
                postInformation: postInformation,
                upvotes: 1,
                subredditId: subredditId,
                authorId: userId
            }
        })

    }catch(error){
        console.log(`Error: ${error}`)
    }

}


export async function uploadImagePost(userId, title, postInformation, subredditId){
    try{
        const post = await prisma.post.create({
            title: title,
            dateAdded: new Date(),
            postInformation: postInformation,
            
        })
    }catch(error){
        console.log(`Error :${error}`)
    }
}
