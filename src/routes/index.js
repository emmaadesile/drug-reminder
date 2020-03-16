/* eslint-disable */
import { Router } from 'express';
import UserController from '../controllers/user';

const router = Router();

// Home route
router.get('/', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: '😎 Welcome to Drug Reminder API'
  });
});

// signup route
router.post('/signup', UserController.signup);

// login route
router.post('/login', UserController.login);

export default router;
