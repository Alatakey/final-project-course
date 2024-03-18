export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  country: string;
}
export interface Blog {
  _id: string;
  text: string;
  userId: string;
}

export interface Author {
  _id: string;
  name: string;
}

export interface UserResponse {
  name: string;
  email: string;
  date: Date;
  country: string;
  _id: string;
}
