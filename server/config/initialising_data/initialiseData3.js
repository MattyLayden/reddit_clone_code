import prisma from '../../prisma/prismaClient.js'



//subreddits
// [Id: subreddit name] = [1: literature], [2: food], [3: science], [4: gaming], [5: travel], 
// [6: world news], [7: United kingdom], [8: movies]


async function updateUserSubscriptions(){



    // ONLY DONE 7 SO FAR


    // monuments15 : subreddits  = Food, gaming, literature

    try{
        const monuments15Subscriptions = await prisma.user.update({
            where :{
                id: 1
            },
            data:{
                subscribedSubreddits:{
                    connect: [
                        {id: 1},
                        {id: 2},
                        {id: 4}
                    ]
                }
            }
        })

        // tricks90 : subreddits  = literature, gaming, travel, science

        const tricks90Subscriptions = await prisma.user.update({
            where :{
                id: 2
            },
            data:{
                subscribedSubreddits:{
                    connect: [
                        {id: 1},
                        {id: 4},
                        {id: 5},
                        {id: 3}
                    ]
                }
            }
        })

        // rockers96 : subreddits  = food, gaming, travel, science, movies

        const rockers96Subscriptions = await prisma.user.update({
            where :{
                id: 3
            },
            data:{
                subscribedSubreddits:{
                    connect: [
                        {id: 2},
                        {id: 4},
                        {id: 5},
                        {id: 3},
                        {id: 8}
                    ]
                }
            }
        })

        // figures74 : subreddits  = literature, gaming, travel, science

        const figures74Subscriptions = await prisma.user.update({
            where :{
                id: 4
            },
            data:{
                subscribedSubreddits:{
                    connect: [
                        {id: 1},
                        {id: 4},
                        {id: 5},
                        {id: 3}
                    ]
                }
            }
        })


        // steads59 : subreddits  = gaming, travel, science, World News

        const steads59Subscriptions = await prisma.user.update({
            where :{
                id: 5
            },
            data:{
                subscribedSubreddits:{
                    connect: [
                        {id: 4},
                        {id: 5},
                        {id: 3},
                        {id: 6}
                    ]
                }
            }
        })
        
        // crowfoots34 : subreddits  = literature, food, movies, gaming, travel, world news, uk 

        const crowfoots34Subscriptions = await prisma.user.update({
            where :{
                id: 6
            },
            data:{
                subscribedSubreddits:{
                    connect: [
                        {id: 1},
                        {id: 2},
                        {id: 8},
                        {id: 4},
                        {id: 5},
                        {id: 6},
                        {id: 7}
                    ]
                }
            }
        })


        // dates9 : subreddits  = literature, food, movies, gaming, travel, world news, 

        const dates9Subscriptions = await prisma.user.update({
            where :{
                id: 7
            },
            data:{
                subscribedSubreddits:{
                    connect: [
                        {id: 1},
                        {id: 2},
                        {id: 8},
                        {id: 4},
                        {id: 5},
                        {id: 6}
                    ]
                }
            }
        })


        console.log('First 7 users succesfully linked subreddits')

    }catch(error){
        console.log(`Error updating users subreddit subscriptions ${error}`)
    }finally{
        await prisma.$disconnect();
    }

}


updateUserSubscriptions();

