import {z} from 'zod';

export type LoginFormType = {
  email: string;
  password: string;
};

export const loginSchema: z.ZodType<LoginFormType> = z.object({
  email: z
    .string({
      required_error: 'Campo de e-mail obrigatório',
    })
    .email('E-mail inválido'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
});
