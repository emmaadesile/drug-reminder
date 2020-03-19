/* eslint-disable */
import { Router } from 'express';
import UserController from '../controllers/user';
import PrescriptionController from '../controllers/prescription';
import authenticateUser from '../utils/auth';

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

// add prescription
router.post(
  '/prescription',
  authenticateUser,
  PrescriptionController.addPrescription
);

// delete prescription
router.delete(
  '/prescription/:prescriptionId',
  authenticateUser,
  PrescriptionController.removePrescription
);

// edit prescription
router.put(
  '/prescription/:prescriptionId',
  PrescriptionController.editPrescription
);

export default router;
