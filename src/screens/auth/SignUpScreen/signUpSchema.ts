import {stringUtils} from '@utils';
import {z} from 'zod';

export type SignUpSchema = z.infer<typeof signUpSchema>;

const userNameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;

export const signUpSchema = z.object({
  username: z
    .string()
    .min(4, 'Muito curto')
    .regex(userNameRegex, 'username inválido')
    .toLowerCase(),
  firstName: z
    .string()
    .min(5, 'nome muito curto')
    .max(50, 'nome muito longo')
    .transform(stringUtils.capitalizeFirstLetter),
  lastName: z
    .string()
    .min(5, 'nome muito curto')
    .max(50, 'nome muito longo')
    .transform(stringUtils.capitalizeFirstLetter),
  email: z.string().email('email inválido'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
});
