import { PrismaClient } from '@prisma/client';

import dotenv from 'dotenv';

dotenv.config(); //need to initiate to obtain process.env



const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL 
        }
    }
});

async function testConnection() {
    try {
        await prisma.$connect(); 
        console.log("Connected to the database successfully.");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
}

testConnection(); 


export default prisma