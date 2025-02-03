import express from 'express'
const router = express.Router();

import multer from 'multer'

import prisma from '../prisma/prismaClient.js';


const upload = multer()

import {uploadToS3, downloadFromS3} from '../config/aws/s3Functions.js'

// uploadToS3(filePath, subredditName, fileName), downloadFromS3(subredditName, fileName)


// just uploading 1 image for the time being

router.post('/image/:subreddit/:filename', upload.single('file'), async(req,res) => {

    const {subredditName, fileName} = req.params

    try{
        if(!req.file){
            console.log('No file received for upload')
        }

        //req.file.buffer is in memory RAM (file is not directly saved just threaded to uploadToS3)

        const fileLocation = uploadToS3(req.file.buffer, subredditName, fileName)

        res.send(fileLocation)

        console.log(`File location sent successfully.`)

    }catch(error){
        console.log(`Could not upload to S3. No file location found. : ${error}`)
    }

})


router.get('/misc/greenTick', async(req,res) => {

    console.log('attempting to get greenTick')

    try{
        const response = await prisma.miscellaneous.findFirst({
            where:{
                id: 4
            }
        })
        console.log(response)

        if(response){
            res.status(200).json({photo: response.photo_links})
        }else{
            res.status(400).json({error: 'internal error, green tick image could not be obtained.'})
        }

        console.log(response)
        

    }catch(error){
        console.log(`Error obtaining green tick image via prisma REST API ${error}`)
        res.status(500).json({error: 'Internal server error'})
    }
})

// {
//     "id": 1,
//     "photo_links": "https://github.com/MattyLayden/reddit_clone1/blob/main/green-tick-mark-icon-transparent-background-7017516950512374lahsvx00q.png"
// }

export default router
