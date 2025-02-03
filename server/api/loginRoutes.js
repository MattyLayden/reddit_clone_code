import express from 'express'

const router = express.Router();

import jwt from 'jsonwebtoken'

import checkLoginDetails from '../fetch_functions/login_checkDatabase.js'



router.post('/checkLogin', async (req, res) => {
    const { loginDetails } = req.body;

    try {
        const loginSuccessObject = await checkLoginDetails(loginDetails);

        if (loginSuccessObject.usernameSuccess && loginSuccessObject.passwordSuccess) {
            
            const token = jwt.sign(
                {
                    id: loginSuccessObject.userInfo.id,
                    username: loginSuccessObject.userInfo.username
                },
                //process.env.JWT_SECRET
                process.env.JWT_SECRET, 
                { expiresIn: '24h' } 
            );

            return res.json({
                token
            });


            // status 401 is server has read it successfully but is not true.

        } else if (loginSuccessObject.usernameSuccess && !loginSuccessObject.passwordSuccess) {
            return res.status(401).json('Incorrect password, please try again');
        } else if (!loginSuccessObject.usernameSuccess) {
            return res.status(404).json('Username incorrect, please try again');
        }

    } catch (error) {
        console.error(`Error during login: ${error}`); 
        //500 status is internal server error
        return res.status(500).json('Internal server error');
    }
});

export default router