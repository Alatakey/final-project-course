import axios, { Axios, AxiosResponse } from "axios";
import { RegisterFormData } from "../interfaces";
import { API_URL } from "../consts";

export async function sendRegisterToServer(formData: RegisterFormData) {
  // send register request in axios
  // return response
  const paramsToSend = {
    name: formData.username,
    email: formData.email,
    password: formData.password,
    dateOfBirth: formData.dateOfBirth,
    country: formData.country,
  };

  const response: AxiosResponse<string> = await axios(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: paramsToSend,
  });

  return response;
}
