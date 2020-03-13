import express from 'express';
import cors from 'cors';
import http from 'http';
import logger from 'morgan';
import bodyParser from 'body-parser';

// initiliase the express app
const app = express();

// const router = express.Router();

app.use(cors());
app.use(logger('dev'));

// parse incoming http requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;
app.set(port, port);

// create server
const server = http.createServer(app);

server.listen(port, () => console.log(`🚀 Server listening on port ${port}`));

app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: 'Welcome to drug reminder API'
  });
});

export default app;
