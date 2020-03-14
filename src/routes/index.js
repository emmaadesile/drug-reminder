/* eslint-disable */
import { Router } from 'express';
import UserController from '../controllers/user';

const routes = Router();

// Home route
routes.get('/', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: '😎 Welcome to Drug Reminder API'
  });
});

// signup route
routes.post('/signup', UserController.signup);

// 404 route
routes.get('/*', (req, res) => {
  res.status(404).json({
    status: 'success',
    message: 'Hey there! Seems you got in the rabbit hole'
  });
});

export default routes;
