import { Prescription, User } from '../models';
import { validatePrescription } from '../utils/validation';

/**
 * @description prescription controller
 * @class PrescriptionController
 */
export default class PrescriptionController {
  /**
   * @description addPrescription method
   * @param  {object} req body of the prescription data
   * @param  {object} res  body of the response message
   * @param  {function} next next function to be called
   * @returns {object} The body of the response message
   */
  static addPrescription(req, res, next) {
    const { isValid, error } = validatePrescription(req.body);
    const { userId } = req;
    const {
      drugName,
      dosePerTime,
      dosePerDay,
      usageDuration,
      usageFreq
    } = req.body;

    const newPrescription = {
      userId,
      drugName,
      dosePerTime,
      dosePerDay,
      usageDuration,
      usageFreq
    };

    User.findOne({
      where: { id: userId }
    })
      .then(user => {
        if (!user) {
          return res.status(403).json({
            status: 'error',
            error: 'user does not exist'
          });
        }

        if (!isValid) {
          return res.status(400).json({
            status: 'error',
            error
          });
        }

        return Prescription.create(newPrescription)
          .then(prescription => {
            const { dataValues } = prescription;

            res.status(200).json({
              status: 'success',
              message: 'prescription created successfully',
              ...dataValues
            });
          })
          .catch(next);
      })
      .catch(next);
  }
}
