import * as Yup from 'yup';

import type {
  LoginFormValues,
  SignUpFormValues,
} from '@/ts/types/schema/AuthSchema';

export const loginSchema: Yup.ObjectSchema<LoginFormValues> =
  Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

export const signUpSchema: Yup.ObjectSchema<SignUpFormValues> =
  Yup.object().shape({
    email: Yup.string().email().required('Username is required'),
    fullname: Yup.string().required('Full Name is required'),
    username: Yup.string().lowercase().min(6).required('Username is required'),
    password: Yup.string().min(8).required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });
