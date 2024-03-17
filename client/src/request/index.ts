import axios, { Axios, AxiosResponse } from "axios";
import { RegisterFormData } from "../interfaces";
import { API_URL } from "../consts";
import dayjs from "dayjs";
import { Ok, Result, ResultAsync, err, ok } from "neverthrow";

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

export async function sendLoginToServer(
  userName: string,
  password: string
): Promise<Result<any, string>> {
  try {
    const paramsToSend = {
      name: userName,
      password: password,
    };
    const response: AxiosResponse = await axios.post(
      `${API_URL}/login`,
      paramsToSend,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response:", response.data);

    return ok(response.data);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Extract the error message from the response
      const errorMessage = error.response?.data || "Unknown error";

      console.error("Error sending login request:", errorMessage);

      // Return error result with the extracted error message
      return err(errorMessage);
    } else {
      // Handle non-Axios errors
      console.error("Non-Axios error occurred:", error.message);

      // Return error result with the error message
      return err(error.message);
    }
  }
}
