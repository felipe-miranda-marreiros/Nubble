import {schemaTypes} from '@form';
import {z} from 'zod';

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signUpSchema = z.object({
  username: schemaTypes.username,
  firstName: schemaTypes.name,
  lastName: schemaTypes.name,
  email: schemaTypes.email,
  password: schemaTypes.password,
});
