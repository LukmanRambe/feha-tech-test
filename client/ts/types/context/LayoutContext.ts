import type { Toast } from '../main/Toast';
import type { LoginFormValues, SignUpFormValues } from '../schema/AuthSchema';

export type LayoutContextData = {
  toast: Toast;
  setToast: React.Dispatch<React.SetStateAction<Toast>>;
  setSignUpFormValues: React.Dispatch<React.SetStateAction<SignUpFormValues>>;
  signUpFormValues: SignUpFormValues;
  setLoginFormValues: React.Dispatch<React.SetStateAction<LoginFormValues>>;
  loginFormValues: LoginFormValues;
  signUp: () => void;
  login: () => void;
  logout: () => void;
  errorMessage: string;
  isLoading: boolean;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
