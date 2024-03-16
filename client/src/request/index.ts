import axios, { Axios, AxiosResponse } from "axios";
import { RegisterFormData } from "../interfaces";
import { API_URL } from "../consts";
import dayjs from "dayjs";

export async function sendRegisterToServer(
  formData: RegisterFormData
): Promise<string> {
  try {
    const paramsToSend = {
      name: formData.username,
      email: formData.email,
      password: formData.password,
      date: dayjs(formData.dateOfBirth).toISOString(),
      country: formData.country,
    };

    const response: AxiosResponse<string> = await axios.post(
      `${API_URL}/register`,
      paramsToSend,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    // If an error occurs, check if it's an AxiosError
    if (axios.isAxiosError(error)) {
      // Extract the error message from the response data
      const errorMessage = error.response?.data;
      console.error("Error message:", errorMessage);
      throw new Error(errorMessage); // You can rethrow the error or handle it as needed
    } else {
      console.error("Unexpected error:", error);
      throw error; // Rethrow any unexpected errors
    }
  }
}
