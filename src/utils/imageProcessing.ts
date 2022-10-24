import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const ImageProcessing = async(width:number, height:number, filename:string) : Promise<string> =>{
    const originalImage:string = path.join(__dirname, '../', '../', 'images/', 'originalImages/', filename) + '.jpg';
    const createdImage:string  = path.join(__dirname, '../', '../', 'images/', 'createdImages/', filename) + '_' + `${width}` + '_' + `${height}`  + '.jpg';
    const createdImagesFolder:string = path.join(__dirname, '../', '../', 'images/', 'createdImages/');

    if(!fs.existsSync(createdImagesFolder))
    {
         fs.mkdirSync(createdImagesFolder);
    }

    try {
        // check if no width and no height sent
            if(!width && !height)
            {
                return originalImage;
            }
        // check if only width is sent
            else if(width && !height) 
            {
                await sharp(originalImage).resize(width).toFile(createdImage);
                return createdImage;
            }
        // check if only height is sent
            else if(!width && height)
            {
                await sharp(originalImage).resize(height).toFile(createdImage);
                return createdImage;
            }
        // check if both width and height are sent
            else 
            {
                await sharp(originalImage).resize(width, height).toFile(createdImage);
                return createdImage;
        
            }
    }
    catch(error) {
        return 'error';
    }

};

export default ImageProcessing;
