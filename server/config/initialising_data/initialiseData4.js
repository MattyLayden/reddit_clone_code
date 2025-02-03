
import prisma from '../../prisma/prismaClient.js';


//subreddits
// [Id: subreddit name] = [1: literature], [2: food], [3: science], [4: gaming], [5: travel], 
// [6: world news], [7: United kingdom], [8: movies]



async function monumentsPosts(){

    try{
        const joyce = await prisma.post.create({
            data:{
                title: "Ive read 4,678 short stories since 1999…",
                dateAdded: new Date(),
                postInformation: "And I reluctantly believe that James Joyce`s “The Dead” is still the most powerful example in the form. I first read it in 2004 and twenty years later I can finally admit its 25 year old author had more insight into our condition than probably 99 out of 100 seventy year olds. I say “reluctant” because I’m a little bummed nothing in 20 years has made me feel more than this endpiece from Dubliners. A story unrivaled, even with its pathos.",
                upvotes: 23,
                subredditId: 1, 
                authorId: 1
            }
        })


        const zelensky = await prisma.post.create({
            data:{
                title: "Zelensky confirms full capture of Russian town of Sudzha in Kursk Oblast",
                dateAdded: new Date(),
                fileUrl: 'https://github.com/MattyLayden/reddit_clone/blob/main/post%20photos/zelensky.jpg?raw=true',
                articleLink: "https://kyivindependent.com/breaking-zelensky-confirms-full-capture-of-russian-town-of-sudzha-in-kursk-oblast/",
                upvotes: 54,
                subredditId: 6,
                authorId:1
            }
        })

        const concord = await prisma.post.create({
            data:{
                title: "CONCORD will be taken offline Sept 6. Sales will cease and refunds will be issued.",
                dateAdded: new Date(),
                fileUrl: "https://preview.redd.it/concord-will-be-taken-offline-sept-6-sales-will-cease-and-v0-ltexmvtcbmmd1.jpeg?auto=webp&s=5a9e7d6cc005ea9e1d0a041b55ff16974aaa1062",
                upvotes: 101,
                subredditId: 4,
                authorId: 1
            }
        })

        const wizzair = await prisma.post.create({
            data:{
                title: "Wizz air left my 14 year old alone in Rome because of overbooking",
                dateAdded: new Date(),
                postInformation: "Today my son was travelling home from a sport camp in Italy with Wizz air. Due to a problem with online check-in he had to go to the check-in desk and pay extra for checking in there. He did not get assigned a seat. When he told me this I thought he would surely get one at the gate. Once boarding was finished he was told he was bumped off due to overbooking. Over the phone the staff at the gate told me they could give us €250 compensation and sort accommodation until their next flight to Iceland… which leaves in a week! His coach was given the option to volunteer her seat and accept the minimal compensation and the same deal - which would have meant her leaving the rest of the group (which included children younger than him)",
                upvotes: 94,
                subredditId: 5,
                authorId: 1
            }
        })

    }catch(error){
        console.log(`Error adding monuments post: ${error}`)
    }

}

async function tricks90Posts(){

    try{
        const challenging = await prisma.post.create({
            data:{
                title: 'What are the most challenging pieces you\'ve read?',
                dateAdded: new Date(),
                postInformation: 'What are the most challenging classics, poetry, or contemporary fiction you\'ve read, and why? Did you find whatever it was to be rewarding? Was its rewarding as you went through it or after you finished?',
                upvotes: 46,
                subredditId:1, 
                authorId: 2
            }
        })


        const gta = await prisma.post.create({
            data:{
                title: "GTA 6 TRAILER DROPPED NOW",
                dateAdded: new Date(),
                fileUrl: "https://github.com/MattyLayden/reddit_clone/blob/main/post%20photos/gta6.jpg?raw=true",
                articleLink: "https://www.youtube.com/watch?v=QdBZY2fkU-0",
                postInformation: "It has been too long of a wait..",
                upvotes: 121,
                subredditId: 4,
                authorId:2
            }
        })

        const kazak = await prisma.post.create({
            data:{
                title: "Took a trip to Kazakhstan for 8 days",
                dateAdded: new Date(),
                fileUrl: "https://github.com/MattyLayden/reddit_clone/blob/main/Kazakhstan.png?raw=true",
                upvotes: 89,
                subredditId: 6,
                authorId:2
            }
        })
        const age = await prisma.post.create({
            data:{
                title: "Scientists find humans age dramatically in two bursts,. At 44, then 60",
                dateAdded: new Date(),
                postInformation: "https://www.theguardian.com/science/article/2024/aug/14/scientists-find-humans-age-dramatically-in-two-bursts-at-44-then-60-aging-not-slow-and-steady",
                upvotes: 45,
                subredditId: 3,
                authorId:2
            }
        })



    }catch(error){
        console.log(`Error adding tricks post: ${error}`)
    }

}


//id 8

async function rockers96Posts(){
    try{
        const roast = await prisma.post.create({
            data:{
                title: "[homemade] British Sunday roast",
                dateAdded: new Date(),
                fileUrl: "https://github.com/MattyLayden/reddit_clone/blob/main/post%20photos/sundayroast.jpg?raw=true",
                upvotes: 46,
                subredditId:2, 
                authorId: 8
            }
        })

        const psCEO = await prisma.post.create({
            data:{
                title: 'Sony PlayStation\'s CEO Jim Ryan was at PlayStation London Studios 6 days ago. Yesterday, he announced the studio is being closed.',
                dateAdded: new Date(),
                fileUrl: "https://preview.redd.it/sony-playstations-ceo-jim-ryan-was-at-playstation-london-v0-r79zt8f3zclc1.jpeg?auto=webp&s=10410a76faf7636de573656cecb1c32fab04d572",
                upvotes: 132,
                subredditId:4, 
                authorId: 8
            }
        })

        const usedTo = await prisma.post.create({
            data:{
                title: "No matter how well traveled you are, what`s something you`ll never get used to?",
                dateAdded: new Date(),
                postInformation: 'For me it\'s using a taxi service and negotiating the price. I\'m not going back and forth about the price, arguing with the taxi driver to turn the meter, get into a screaming match because he wants me to pay more. If it`s a fixed price then fine but I`m not about to guess how much something should cost and what route he`s going to take especially if I just arrived to that country for the first time. It doesn\'t matter if I\'m in Europe, Asia, the Middle East, or South America. I will use public transport/uber or simply figure it out. Or if I`m arriving somewhere I\'ll prepay for a car to pick me up from the airport to my accommodation. I think this is the only thing I`ll never get used to.',
                upvotes: 14,
                subredditId:5, 
                authorId: 8
            }
        })

        const republican = await prisma.post.create({
            data:{
                title: "Democrats rarely have Republicans as romantic partners and vice versa, study finds. The share of couples where one partner supported the Democratic Party while the other supported the Republican Party was only 8%.",
                dateAdded: new Date(),
                postInformation: "https://www.psypost.org/democrats-rarely-have-republicans-as-romantic-partners-and-vice-versa-study-finds/",
                upvotes: 67,
                subredditId: 3,
                authorId:8
            }
        })

        const wolverine = await prisma.post.create({
            data:{
                title: "Deadpool & Wolverine Crosses $1B Globally",
                dateAdded: new Date(),
                fileUrl: "https://m.media-amazon.com/images/M/MV5BZTk5ODY0MmQtMzA3Ni00NGY1LThiYzItZThiNjFiNDM4MTM3XkEyXkFqcGc@._V1_.jpg",
                articleLink: "https://deadline.com/2024/08/deadpool-wolverine-1-billion-global-box-office-1236037206/",
                upvotes: 40,
                subredditId: 8,
                authorId:8
            }
        })


    }catch(error){
        console.log(`Error adding rockers posts: ${error}`)
    }
}

// id 9

async function figures74Posts(){
    try{
        const genreDefining = await prisma.post.create({
            data:{
                title: "Which authors have been truly genre defining?",
                dateAdded: new Date(),
                postInformation: "J.R.R. Tolkien is one of the most famous authors to ever wield a pen, and I think it's beyond argument that he has had a massive impact on the fantasy genre as a whole. So many concepts which seem central to the entire notion of what fantasy is, elves, orcs, etc., are the result of his work.",
                upvotes: 36,
                subredditId:1, 
                authorId: 9
            }
        })

        const henry = await prisma.post.create({
            data:{
                title: "Henry Cavill says heading up the Warhammer 40,000 cinematic universe is 'the greatest privilege of my professional career'",
                dateAdded: new Date(),
                postInformation: "https://www.pcgamer.com/henry-cavill-says-heading-up-the-warhammer-40000-cinematic-universe-is-the-greatest-privilege-of-my-professional-career/",
                upvotes: 22,
                subredditId:4, 
                authorId: 9
            }
        })

        const japan = await prisma.post.create({
            data:{
                title: "Has anybody been to Japan and not loved it?",
                dateAdded: new Date(),
                postInformation: "I was there for work recently, and only had time to visit Kyoto and Tokyo, I thought it was nice, but I didn't love it. It was just like any other place to me. I found CDMX to be more interesting, Kyoto was really touristy and perhaps maybe I shouldn't have gone there when I did. I was looking up more places to visit but none caught my attention. Nature wise, I think there are prettier countries like NZ, Canada, US, Chile. The food was good, but was disappointed in so many dishes.",
                upvotes: 67,
                subredditId:5, 
                authorId: 9
            }
        })

        const republican = await prisma.post.create({
            data:{
                title: "Long-term unemployment leads to disengagement and apathy, rather than efforts to regain control",
                dateAdded: new Date(),
                postInformation: "https://www.psypost.org/long-term-unemployment-leads-to-disengagement-and-apathy-rather-than-efforts-to-regain-control/",
                upvotes: 67,
                subredditId: 3,
                authorId:9
            }
        })

    
    }catch(error){
        console.log(`Error adding figures posts: ${error}`)
    }
}




async function addPosts(){

    try{
        await Promise.all([
            await monumentsPosts(),
            await tricks90Posts(),
            await rockers96Posts(),
            await figures74Posts(),
            //more
        ])
        
        console.log("All posts added")
    }catch(error){
        console.log(`Error adding posts: ${error}`)
    }finally{
        await prisma.$disconnect()
    }


}

addPosts();