import express from 'express';

const routes = express.Router();

routes.get('/image', (req, res)=>{
    res.send('routesssss');
});

export default routes;