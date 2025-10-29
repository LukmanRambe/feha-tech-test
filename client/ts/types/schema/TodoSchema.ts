export type CreateTodoFormValues = {
  name: string;
  description: string;
};

export type UpdateTodoFormValues = {
  name: string;
  description: string;
  isComplete?: boolean;
};
