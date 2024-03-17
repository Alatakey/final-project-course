export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  country: string;
}
export interface ResultBool {
  isOk: boolean;
  error?: string;
}

export interface ResultValue<T> {
  error?: string;
  data: T | null;
}
