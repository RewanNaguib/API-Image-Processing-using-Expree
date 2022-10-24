import sharp from 'sharp';
import path from 'path';

// create a variable that get the original image name from it's path (images/originalImages)
// create a variable that create a new image name (originalname-width-height.jpg) (images/createdImages)
// create a folder for the created images if it doesn't exist (images/createdImages)
// resize the image based on the query parameters sent in the URL (filename, height, width) => using sharp
