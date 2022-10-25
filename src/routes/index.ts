import express from 'express';
import path from 'path';
import fs from 'fs';
import ImageProcessing from '../utils/imageProcessing';

const routes = express.Router();

routes.get('/image', async(req, res): Promise<void>=>{

    const width =  parseInt(req.query.width  as string);
    const height = parseInt(req.query.height as string);
    const filename = (req.query.filename as unknown) as string;
    
    //check that the width the user enters must be > 0
    if(width <= 0)
    {
        res.status(400).send('Width should be greather than 0');
    } 
    
    //check that the width the user enters is only type number
    if(isNaN(width) && req.query.width) 
    {
        res.status(400).send('Width should be type number only');
    }

    //check that the height the user enters must be > 0
    if(height <= 0)
    {
        res.status(400).send('Height should be greater than 0');
    }

    //check that the height the user enters is only type number
    if(isNaN(height) && req.query.height) 
    {
        res.status(400).send('Height should be type number only');
    }

    /**
     * @todo: if filename sent alone with a name that doesn't exit
     *    if filename sent with width and height and i entered a name that doesn't exit i got the error
     */
    if(filename) 
    {
        const createdImage:string  = path.join(__dirname, '../', '../', 'images/', 'createdImages/', filename) + '_' + `${width}` + '_' + `${height}`  + '.jpg';

        if(fs.existsSync(createdImage))
        {
            res.sendFile(createdImage);
        }

        else 
        {
            const finalImage = await ImageProcessing(width, height, filename);

            if (!String(finalImage).includes('error')) 
            {
                res.sendFile(finalImage);
            }

            else
            {
                res.status(404).send('Check the filename you entered');
            }
        }
    }
    else
    {
        res.status(500).send('You should enter at least a filename in the query string');
    }

});

export default routes;