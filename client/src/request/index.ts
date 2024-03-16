import axios, { Axios, AxiosResponse } from "axios";
import { RegisterFormData } from "../interfaces";
import { API_URL } from "../consts";
import dayjs from "dayjs";

export async function sendRegisterToServer(formData: RegisterFormData) {
  const paramsToSend = {
    name: formData.username,
    email: formData.email,
    password: formData.password,
    date: dayjs(formData.dateOfBirth).toISOString(),
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
