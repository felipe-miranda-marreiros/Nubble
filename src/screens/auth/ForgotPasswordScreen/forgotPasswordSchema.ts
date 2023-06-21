import {z} from 'zod';

export type ForgotPasswordFormType = {
  email: string;
};

export const forgotPasswordSchema: z.ZodType<ForgotPasswordFormType> = z.object(
  {
    email: z.string().email('E-mail inválido'),
  },
);
