import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// create a variable that get the original image name from it's path (images/originalImages)
// create a variable that create a new image name (originalname_width_height.jpg) (images/createdImages)
// create a folder for the created images if it doesn't exist (images/createdImages)
// resize the image based on the query parameters sent in the URL (filename, height, width) => using sharp

const ImageProcessing = async(width:number, height:number, filename:string) : Promise<string> =>{
    const originalImage:string = path.join(__dirname, '../', '../', 'images/', 'originalImages/', filename) + '.jpg';
    const createdImage:string  = path.join(__dirname, '../', '../', 'images/', 'createdImages/', filename) + '_' + `${width}` + '_' + `${height}`  + '.jpg';
    const createdImagesFolder:string = path.join(__dirname, '../', '../', 'images/', 'createdImages/');

    if(!fs.existsSync(createdImagesFolder))
    {
        await fs.mkdirSync(createdImagesFolder);
    }

    try {
            if(!width && !height)
            {
                return originalImage;
            }
        
            else if(width && !height) 
            {
                await sharp(originalImage).resize(width).toFile(createdImage);
                return createdImage;
            }
        
            else if(!width && height)
            {
                await sharp(originalImage).resize(height).toFile(createdImage);
                return createdImage;
            }
        
            else 
            {
                await sharp(originalImage).resize(width, height).toFile(createdImage);
                return createdImage;
        
            }
    }
    catch(error) {
        return error;
    }
};

export default ImageProcessing;
