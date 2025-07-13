import express from 'express';
import { v1 as uuid } from 'uuid';
import patients, { Patient, Gender } from '../../data/patients';
import { toNewPatient } from '../utils/validation';

const router = express.Router();

// Utility type to exclude ssn from Patient
type PublicPatient = Omit<Patient, 'ssn'>;

router.get('/', (_req, res) => {
  // Map patients to exclude ssn field
  const publicPatients: PublicPatient[] = patients.map(({ ssn, ...patient }) => patient);
  res.json(publicPatients);
});

router.get('/:id', (req, res) => {
  const patient = patients.find(p => p.id === req.params.id);
  
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send('Patient not found');
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatient(req.body);
    const newPatient: Patient = {
      id: uuid(),
      entries: [],
      ...newPatientEntry
    };

    patients.push(newPatient);
    res.json(newPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router; 