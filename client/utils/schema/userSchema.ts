import * as Yup from 'yup';

import type { UpdateUserFormValues } from '@/ts/types/schema/UserSchema';

export const updateUserSchema: Yup.ObjectSchema<UpdateUserFormValues> =
  Yup.object().shape({
    fullname: Yup.string().required('Username is required'),
    oldPassword: Yup.string().min(8).required('Old Password is required'),
    newPassword: Yup.string().min(8).required('New Password is required'),
  });
