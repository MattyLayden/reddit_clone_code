
import prisma from '../../prisma/prismaClient.js';


const images = ['https://github.com/MattyLayden/reddit_clone/blob/main/green-tick-mark-icon-transparent-background-7017516950512374lahsvx00q.png?raw=true',
    'https://raw.githubusercontent.com/MattyLayden/reddit_clone1/refs/heads/main/question-mark-xxl.png', "https://github.com/MattyLayden/reddit_clone/blob/main/blankprofile.png?raw=true"
]


async function addMiscellaneous(){
    for(let i=0; i<images.length; i++){
        await prisma.miscellaneous.create({
            data:{
                photo_links: images[i]
            }
        })

        
    }
    console.log('Attempted to upload images to Miscellaneous')
    await prisma.$disconnect()
}

addMiscellaneous();