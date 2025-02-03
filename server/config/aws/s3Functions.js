import s3 from './awsSetup.js'
import fs from 'fs'



//returns link to upload location (url) use this for prisma.post.create

async function uploadToS3(filePath, subredditName, fileName){

    try{

        const fileContent = fs.readFileSync({filePath});

        const params = {
        Bucket: {subredditName},
        Key: {fileName}, 
        Body: fileContent, 
        ContentType: 'image/jpeg' 
        };

        // Upload the file to S3
        // .promise() as async function, and s3 is a callback function(not a promise)

        const upload = await s3.upload(params).promise() 

        console.log(`File upload successful. Location : ${upload.location}`)

        return upload.location

    }catch(error){
        console.log(`Error uploading file ${error}`)
    }
}


async function downloadFromS3(subredditName, fileName) {
    const params = {
        Bucket: {subredditName}, 
        Key: {fileName}
    };

    try {
        const data = await s3.getObject(params).promise();  
        console.log('File downloaded successfully');
        return data.Body;  
    } catch (err) {
        console.error('Error downloading file:', err);
    }
}


export {uploadToS3, downloadFromS3}