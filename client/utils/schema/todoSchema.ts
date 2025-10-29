import * as Yup from 'yup';

import type {
  CreateTodoFormValues,
  UpdateTodoFormValues,
} from '@/ts/types/schema/TodoSchema';

export const createTodoSchema: Yup.ObjectSchema<CreateTodoFormValues> =
  Yup.object().shape({
    name: Yup.string().max(50).required('Name is required'),
    description: Yup.string().max(1000).required('Description is required'),
  });

export const updateTodoSchema: Yup.ObjectSchema<UpdateTodoFormValues> =
  Yup.object().shape({
    name: Yup.string().max(50).required('Name is required'),
    description: Yup.string().max(1000).required('Description is required'),
    isComplete: Yup.boolean(),
  });
