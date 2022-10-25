import express from 'express';
import routes from './routes/index';

const app = express();
const port = 4040;

app.use('/api', routes);

app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
});

export default app;
