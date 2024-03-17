export interface ResultBool {
  isOk: boolean;
  error?: string;
}

export interface ResultValue<T> {
  error?: string;
  data: T | null;
}

export interface SignData {
  name: string;
  email: string;
}
