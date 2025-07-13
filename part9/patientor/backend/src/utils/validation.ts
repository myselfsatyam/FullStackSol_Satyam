import { z } from 'zod';
import { Gender, NewPatient } from '../../data/patients';

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

// Zod schema for gender validation
const GenderSchema = z.nativeEnum(Gender);

// Zod schema for new patient validation
const NewPatientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  dateOfBirth: z.string().refine(isDate, 'Invalid date format'),
  ssn: z.string().min(1, 'SSN is required'),
  gender: GenderSchema,
  occupation: z.string().min(1, 'Occupation is required')
});

export const toNewPatient = (object: unknown): NewPatient => {
  const result = NewPatientSchema.safeParse(object);
  
  if (!result.success) {
    throw new Error(`Invalid data: ${result.error.message}`);
  }
  
  return result.data;
}; 