import {z} from 'zod';

export type SignUpFormType = {
  username: string;
  fullname: string;
  email: string;
  password: string;
};

const userNameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;

export const signUpSchema: z.ZodType<SignUpFormType> = z.object({
  username: z.string().regex(userNameRegex, 'username inválido').toLowerCase(),
  fullname: z
    .string()
    .min(5, 'nome muito curto')
    .max(50, 'nome muito longo')
    .transform(value => {
      return value
        .split(' ')
        .map(word => word.charAt(0) + word.slice(1).toLowerCase())
        .join(' ');
    }),
  email: z.string().email('email inválido'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
});
