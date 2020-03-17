import dotenv from 'dotenv';
import { chai, expect } from '../config/setup';
import { prescription } from '../config/testData';
import TokenHelper from '../../utils/tokenHelper';
import app from '../../index';

dotenv.config();

const token = `Bearer ${TokenHelper.generateToken({
  id: 1,
  firstName: 'Thor'
})}`;

describe('Prescription', () => {
  it('it adds a new prescription', done => {
    const {
      drugName,
      dosePerTime,
      dosePerDay,
      usageDuration,
      usageFreq
    } = prescription.validPrescription;

    chai
      .request(app)
      .post('/api/prescription')
      .set({ authorization: token })
      .send(prescription.validPrescription)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.drugName).to.equal(drugName);
        expect(res.body.dosePerTime).to.equal(dosePerTime);
        expect(res.body.dosePerDay).to.equal(dosePerDay);
        expect(res.body.usageDuration).to.equal(usageDuration);
        expect(res.body.usageFreq).to.equal(usageFreq);
        done();
      });
  });
});
