import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './prisma/prismaClient.js';

import { router as commentRoutes } from './api/commentRoutes.js';
import loginRoutes from './api/loginRoutes.js';
import postsRoutes from './api/postsRoute.js';
import subredditRoutes from './api/subredditRoute.js';
import uploadRoutes from './api/uploadRoutes.js';
import userRoutes from './api/userRoute.js';

const app = express();
const port = 5001;

dotenv.config();

console.log('DATABASE_URL:', process.env.DATABASE_URL);

const corsOptions = {
    origin: 'http://localhost:3000',  // Frontend URL 
    credentials: true,                // Allow cookies, Authorization header
    optionSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow Authorization header
  };
  
  app.use(cors(corsOptions));

app.use(express.json()); // needs to be above routes

app.use('/api/posts', postsRoutes);
app.use('/api/subreddit', subredditRoutes);
app.use('/api/user', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/login', loginRoutes);

app.get('/api/test', (req, res) => {
    console.log("Test route hit"); 
    res.status(200).json({ message: "API is working" });
});

async function startServer() {
    try {
        await prisma.$connect(); 
        console.log("Connected to the database successfully.");
        
        
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
}

startServer();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
