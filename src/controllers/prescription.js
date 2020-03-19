import { Prescription, User } from '../models';
import { validatePrescription } from '../utils/validation';
import { generateId } from '../utils/utilHelpers';

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

    const prescriptionId = generateId(drugName);

    const newPrescription = {
      prescriptionId,
      userId,
      drugName,
      dosePerTime,
      dosePerDay,
      usageDuration,
      usageFreq
    };

    return User.findOne({
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

  /**
   * @description removePrescription method
   * @param  {object} req body of the prescription data
   * @param  {object} res  body of the response message
   * @param  {function} next next function to be called
   * @returns {object} The body of the response message
   */
  static removePrescription(req, res, next) {
    const { userId } = req;
    const prescriptionId = parseInt(req.params.prescriptionId, 10);

    return Prescription.findByPk(prescriptionId)
      .then(prescription => {
        if (!prescription) {
          return res.status(404).json({
            status: 'error',
            error: 'prescription does not exist'
          });
        }
        const { dataValues } = prescription;

        if (userId !== dataValues.userId) {
          return res.status(403).json({
            status: 'error',
            error: 'you have no permission to remove this prescrption'
          });
        }

        return prescription
          .destroy()
          .then(() =>
            res.status(200).json({
              status: 'success',
              message: 'prescription deleted successfully'
            })
          )
          .catch(next);
      })
      .catch(next);
  }

  /**
   * @description editPrescription method
   * @param  {object} req body of the prescription data
   * @param  {object} res  body of the response message
   * @param  {function} next next function to be called
   * @returns {object} The body of the response message
   */
  static editPrescription(req, res, next) {
    const { userId } = req;
    const prescriptionId = parseInt(req.params.prescriptionId, 10);
    const { verifyDrugUsage } = req.body;
    // console.log({verifyDrugUsage})
    if (
      !verifyDrugUsage ||
      verifyDrugUsage !== true ||
      verifyDrugUsage !== false
    ) {
      return res.status(400).json({
        status: 'error',
        error: 'Please verify drug usage with yes or no'
      });
    }

    let verify;

    if (verifyDrugUsage === 'yes') {
      verify = 1;
    } else if (verify === 'no') {
      verify = 0;
    }

    return Prescription.findOne({
      where: { id: prescriptionId }
    })
      .then(prescription => {
        if (!prescription) {
          return res.status(404).json({
            status: 'error',
            error: 'prescription does not exist'
          });
        }

        if (prescription.userId !== userId) {
          return res.status(403).json({
            status: 'error',
            error: 'you have no permission to edit this prescrption'
          });
        }

        return prescription
          .update({
            verifyDrugUsage: verify
          })
          .then(isUpdated => {
            if (!isUpdated) {
              return res.status(500).json({
                status: 'error',
                message: 'an error occurred while updating the prescription'
              });
            }
            return res.status(200).json({
              status: 'success',
              message: 'prescription updated successfully'
            });
          })
          .catch(next);
      })
      .catch(next);
  }
}
