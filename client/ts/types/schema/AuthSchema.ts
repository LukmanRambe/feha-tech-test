export type LoginFormValues = {
  username: string;
  password: string;
};

export type SignUpFormValues = LoginFormValues & {
  email: string;
  fullname: string;
  confirmPassword: string;
};
