
import prisma from '../prisma/prismaClient.js'

import bcrypt from 'bcrypt'

//this needs adding to the signup page

//const bcrypt = require('bcrypt');
//const saltRounds = 10; // Cost factor; you can adjust this

//const password = 'mySecurePassword';

// Hash the password
//const hashedPassword = await bcrypt.hash(password, saltRounds);
// Store hashedPassword in the database
//



export default async function checkLoginDetails(loginDetails){

    //suppose that loginDetails = {username: 'user1', password: 'password23'} from req.body
    const {username, password} = loginDetails

    try{
        const usernameCheck = await prisma.user.findFirst({
            where:{
                username: username
            }
            
        })
        

        if(usernameCheck){
            //usernameCheck.password is the hashed password that is saved in the database

            const comparePasswords = await bcrypt.compare(password, usernameCheck.password)

            if(comparePasswords){
                return {usernameSuccess: true, passwordSuccess: true, 
                    userInfo:{
                        id: usernameCheck.id,
                        username: usernameCheck.username
                }}
            }else{
                return {usernameSuccess: true, passwordSuccess: false}
            }
        }else{ 
            return {usernameSuccess: false}
        }

        




    }catch(error){
        console.log(`Error obtaining login details ${error}`)
    }

}