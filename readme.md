
### Project Description
This project is an API Image Processing using Express js 
* the user enters query parameters (filename, height, width) of an image and accordning to them 
   the image with the filename specified will return to the user in the browser with the height and width the user enters.
* If the Image dimensions that the user enters in the query parameters is already exists it will return to the user without Image Processing, 
  But if it doesn't exists the image will be processed and it will be saved in the project in a folder called "createdImages" with these new dimensions
  to be returned directly without processing if the user wanted it again.  

### Installing Dependencies

project requires having node installed https://nodejs.org/en/download/

run ```npm install``` to install the dependencies

### content
packages for testing/developping backend apps, eslint and prettier configured

### To Run Server
  run `npm run start`
  
### To Run The Project
 1) Add the Images You want in the project in Directory `images/originalImages` .
 
 3) Visit http://localhost:6000/api/image?filename=&width=&height=
   (filename => image name)
   
   filename "required".
   width  "optional".
   height "optional".
   
   It's mendatory to send the filename, you can't send width and height in this case the original image will be returned.
   You can send filename + width only .
   You can send filename & height only .
   You can send filename & width & height . 

   

## Testing
Testing is done using jasmine
To run the tests, run
```
npm run test
```
