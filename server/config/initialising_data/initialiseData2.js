
import prisma from '../../prisma/prismaClient.js'
import bcrypt from 'bcrypt'

// https://github.com/MattyLayden/reddit_clone1/blob/main/food.jpg
// football image is a .webp file?
// https://github.com/MattyLayden/reddit_clone1/blob/main/gaming(remove%20bottom).jpg REMOVE BOTTOM OF IMAGE
// https://github.com/MattyLayden/reddit_clone1/blob/main/literature.jpg
// https://github.com/MattyLayden/reddit_clone1/blob/main/movies.jpg
// https://github.com/MattyLayden/reddit_clone1/blob/main/science.jpg
// https://github.com/MattyLayden/reddit_clone1/blob/main/travel.jpg
// https://github.com/MattyLayden/reddit_clone1/blob/main/uk.png
// https://github.com/MattyLayden/reddit_clone1/blob/main/world%20image.jpg




const initialUserData = [
    { username: 'monuments15', email: 'monuments15@gmail.com', password: 'password1', icon: 'https://avatar.iran.liara.run/public/70' },
    { username: 'tricks90', email: 'tricks90@gmail.com', password: 'password2', icon: 'https://avatar.iran.liara.run/public/15' },
    { username: 'rockers96', email: 'rockers96@gmail.com', password: 'password3', icon: 'https://avatar.iran.liara.run/public/87' },
    { username: 'figures74', email: 'figures74@gmail.com', password: 'password4', icon: 'https://avatar.iran.liara.run/public/91' },
    { username: 'steads59', email: 'steads59@gmail.com', password: 'password5', icon: 'https://avatar.iran.liara.run/public/5' },
    { username: 'crowfoots34', email: 'crowfoots34@gmail.com', password: 'password6', icon: 'https://avatar.iran.liara.run/public/26' },
    { username: 'dates9', email: 'dates9@gmail.com', password: 'password7', icon: 'https://avatar.iran.liara.run/public/76' },
    { username: 'crossovers3', email: 'crossovers3@gmail.com', password: 'password8', icon: 'https://avatar.iran.liara.run/public/10' },
    { username: 'thinkables94', email: 'thinkables94@gmail.com', password: 'password9', icon: 'https://avatar.iran.liara.run/public/47' },
    { username: 'bends38', email: 'bends38@gmail.com', password: 'password10', icon: 'https://avatar.iran.liara.run/public/97' },
    { username: 'constructs74', email: 'constructs74@gmail.com', password: 'password11', icon: 'https://avatar.iran.liara.run/public/14' },
    { username: 'slips68', email: 'slips68@gmail.com', password: 'password12', icon: 'https://avatar.iran.liara.run/public/57' },
    { username: 'quacks4', email: 'quacks4@gmail.com', password: 'password13', icon: 'https://avatar.iran.liara.run/public/28' },
    { username: 'mournerss47', email: 'mournerss47@gmail.com', password: 'password14', icon: 'https://avatar.iran.liara.run/public/40' },
    { username: 'guarantees52', email: 'guarantees52@gmail.com', password: 'password15', icon: 'https://avatar.iran.liara.run/public/67' },
    { username: 'tussocks1', email: 'tussocks1@gmail.com', password: 'password16', icon: 'https://avatar.iran.liara.run/public/48' },
    { username: 'damages2', email: 'damages2@gmail.com', password: 'password17', icon: 'https://avatar.iran.liara.run/public/32' },
    { username: 'departments37', email: 'departments37@gmail.com', password: 'password18', icon: 'https://avatar.iran.liara.run/public/82' },
    { username: 'leaves52', email: 'leaves52@gmail.com', password: 'password19', icon: 'https://avatar.iran.liara.run/public/89' },
    { username: 'scarces97', email: 'scarces97@gmail.com', password: 'password20', icon: 'https://avatar.iran.liara.run/public/42' }
];


    
const initialSubredditData = [
    { 
        name: "Food", 
        icon: 'https://github.com/MattyLayden/reddit_clone/blob/main/food2.png?raw=true',
        description: "This subreddit is a community for food enthusiasts where users can share recipes, food photography, culinary tips, and the latest food trends. Whether you're a professional chef or a home cook, you'll find a place to explore and discuss all things food-related."
    },
    { 
        name: "Gaming", 
        icon: 'https://github.com/MattyLayden/reddit_clone/blob/main/gaming2.jpg?raw=true',
        description: "A vibrant community for gamers of all platforms to discuss the latest video games, gaming news, reviews, and upcoming releases. Whether you enjoy competitive play, story-driven games, or just casual gaming, this subreddit is the place to connect with fellow players."
    },
    { 
        name: "Literature", 
        icon: 'https://github.com/MattyLayden/reddit_clone/blob/main/literature.jpg?raw=true',
        description: "A dedicated space for book lovers, writers, and literature enthusiasts to discuss books, share recommendations, participate in reading challenges, and engage in deep literary discussions. Explore genres, authors, and literary movements from all over the world."
    },
    { 
        name: "Movies", 
        icon: 'https://github.com/MattyLayden/reddit_clone/blob/main/movies.jpg?raw=true',
        description: "Join this community of film buffs to talk about movies, from the latest blockbusters to classic cinema. Share reviews, discuss theories, discover hidden gems, and stay up to date with the film industry’s news, including upcoming releases, trailers, and actor interviews."
    },
    { 
        name: "Science", 
        icon: 'https://github.com/MattyLayden/reddit_clone/blob/main/science.jpg?raw=true',
        description: "A hub for all things science, where users can engage in discussions about scientific discoveries, share the latest research findings, and delve into topics ranging from space exploration to environmental science and everything in between. Curious minds unite to explore the wonders of the natural world."
    },
    { 
        name: "Travel", 
        icon: 'https://github.com/MattyLayden/reddit_clone/blob/main/travel2.png?raw=true',
        description: "This subreddit is for travelers, wanderlust seekers, and adventure enthusiasts to share their experiences, tips, and stories about destinations around the globe. From budget travel advice to luxury destinations, learn about cultures, explore new places, and plan your next trip."
    },
    { 
        name: "United Kingdom", 
        icon: 'https://github.com/MattyLayden/reddit_clone/blob/main/uk.png?raw=true',
        description: "A subreddit dedicated to the United Kingdom, covering everything from British news and politics to culture, history, and current events. Join discussions about UK-specific topics, local events, and the unique experiences that come with living in or visiting Britain."
    },
    { 
        name: "World News", 
        icon: 'https://github.com/MattyLayden/reddit_clone/blob/main/world%20image.jpg?raw=true',
        description: "Stay informed with this global news community where users discuss important events, breaking news, and current affairs from around the world. From international politics to global economic shifts, this subreddit keeps you up to date with what’s happening on the global stage."
    }
]




const saltRounds = 10;

async function initialiseUsers() {
    try {
        const users = await Promise.all(
            initialUserData.map(async (userData) => {
                
                const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
                return prisma.user.create({
                    data: {
                        username: userData.username,
                        email: userData.email,
                        password: hashedPassword, 
                        icon: userData.icon
                    }
                });
            })
        );
        console.log('Users successfully created.');
    } catch (error) {
        console.log(`Error initializing user data: ${error}`);
    }
}


async function initialiseSubreddits(){
    try{
        const subreddits = await Promise.all(
            initialSubredditData.map(subredditData => prisma.subreddit.create({data: subredditData}))
        )
        console.log("Subreddits successfully created. ")
    }catch(error){
        console.log(`Error initialising subreddit data: ${error}`)
    }
}



async function initialiseAllData(){
    await initialiseUsers();
    await initialiseSubreddits();

}

initialiseAllData();