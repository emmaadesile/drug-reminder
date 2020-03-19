import express from 'express';
import cors from 'cors';
import http from 'http';
import logger from 'morgan';
import bodyParser from 'body-parser';
import errorhandler from 'errorhandler';
import routes from './routes';

// initiliase the express app
const app = express();

app.use(cors());
app.use(logger('dev'));

// parse incoming http requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;
app.set(port, port);

// create server
const server = http.createServer(app);

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  app.use(errorhandler());
}

// development error handler
if (!isProduction) {
  app.use((err, req, res, next) => {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      error: {
        message: err.message,
        error: err
      },
      status: 'error'
    });
  });
}

// API version v1
app.use('/api', routes);

// 404 error handler
app.use((req, res, next) => {
  res.status(404).json({
    status: 'success',
    message: 'Hey there! Seems you got lost down the rabbit hole'
  });
  next();
});

server.listen(port, () => console.log(`🚀 Server listening on port ${port}`));

export default app;
