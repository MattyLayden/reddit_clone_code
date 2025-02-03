import prisma from '../../prisma/prismaClient.js'



async function monumentsComments(){

    try{

        const challengingLiteratureComment = await prisma.comment.create({
            data:{
                dateAdded: new Date(),
                commentInformation: "Faucault's Pendulum was a tough read. So much metafiction, so many references to all kinds of obscure literary and historical concepts, and so much discussion of conspiracy theories to the point that you can't tell what's real and what's not.",
                upvotes: 4,
                parentPostId: 5,
                authorId: 1,
            }
        })

        const gtaComment = await prisma.comment.create({
            data:{
                dateAdded: new Date(),
                commentInformation: "Very excited for this.",
                upvotes: 10,
                parentPostId: 6,
                authorId: 1
            }
        })


    }catch(error){
        console.log(`Error adding rockers comments ${error}`)
    }
}


async function tricks90Comments(){

    try{

        const concordComment = await prisma.comment.create({
            data:{
                dateAdded: new Date(),
                commentInformation: "Terrible news.",
                upvotes: 9,
                parentPostId: 3,
                authorId: 2,
            }
        })

        const wizzairComment = await prisma.comment.create({
            data:{

                dateAdded: new Date(),
                commentInformation: "I think i'm going to boycott wizz air in that case...",
                upvotes: 11,
                parentPostId: 4,
                authorId: 2
            }
        })


    }catch(error){
        console.log(`Error adding rockers comments ${error}`)
    }
}

async function rockers96Comments(){

    try{

        const joyceComment = await prisma.comment.create({
            data:{
                dateAdded: new Date(),
                commentInformation: "mean, The Dead is amazing, no doubt—Joyce really knows how to make you feel the weight of everything in such a short space. But I’m not sure I’d go as far as calling it the best novel of all time. There are so many incredible books out there, like Ulysses or Moby-Dick, that I think could give it a run for its money.",
                upvotes: 12,
                parentPostId: 1,
                authorId: 3,
            }
        })

        const zelenskyComment = await prisma.comment.create({
            data:{

                dateAdded: new Date(),
                commentInformation: "Things are getting really scary.",
                upvotes: 2,
                parentPostId: 2,
                authorId: 3
            }
        })

        const gtaComment2 = await prisma.comment.create({
            data:{
                dateAdded: new Date(),
                commentInformation: "We got snakes with legs before gta 6. Ive seen it with my own eyes",
                upvotes: 52,
                parentPostId: 6,
                authorId: 3,
            }
        })

        const ageComment = await prisma.comment.create({
            data:{
                dateAdded: new Date(),
                commentInformation: "Hopefully not too much im already 6'3",
                upvotes: 101,
                parentPostId: 8,
                authorId: 3
            }
        })


    }catch(error){
        console.log(`Error adding rockers comments ${error}`)
    }
}

async function figures74Comments(){

    try{

        const roastComment = await prisma.comment.create({
            data:{
                dateAdded: new Date(),
                commentInformation: "Yum im gunna make one asap",
                upvotes: 11,
                parentPostId: 9,
                authorId: 4,
            }
        })

        const usedTo = await prisma.comment.create({
            data:{

                dateAdded: new Date(),
                commentInformation: "The toilet roll situation.",
                upvotes: 2,
                parentPostId: 11,
                authorId: 4
            }
        })

        const gtaComment2 = await prisma.comment.create({
            data:{
                dateAdded: new Date(),
                commentInformation: "Makes sense, everybody i know in couples are politically aligned",
                upvotes: 22,
                parentPostId: 12,
                authorId: 4,
            }
        })

        const ageComment = await prisma.comment.create({
            data:{
                dateAdded: new Date(),
                commentInformation: "This is bad for cinema honestly",
                upvotes: 101,
                parentPostId: 13,
                authorId: 4
            }
        })


    }catch(error){
        console.log(`Error adding rockers comments ${error}`)
    }
}




async function initialiseAllComments(){

    try{
        await Promise.all([
            await monumentsComments(),
            await tricks90Comments(),
            await rockers96Comments(),
            await figures74Comments()

        ])
        console.log('Successfully added comments')
    }catch(error){
        console.log('Error initialising comments')
    }finally{
        await prisma.$disconnect();
    }
}

initialiseAllComments();