import React, { useState } from "react";
import COUNTRIES from "../consts/countries";
import { RegisterFormData } from "../interfaces";
import { sendRegisterToServer } from "../request";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
  onSubmit: (formData: RegisterFormData) => void;
  registrationMessage: string;
}

export default function RegisterPage() {
  const [registrationMessage, setRegistrationMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (formData: RegisterFormData) => {
    // Handle form submission
    try {
      const response = await sendRegisterToServer(formData);
      console.log("Registration response:", response);
      setRegistrationMessage("Registration successful");
      navigate("/login");
    } catch (error: any) {
      setRegistrationMessage("Error occurred: " + error.message);
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <RegisterForm
        onSubmit={handleSubmit}
        registrationMessage={registrationMessage}
      />
    </div>
  );
}

export function RegisterForm({
  onSubmit,
  registrationMessage,
}: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    country: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-80">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      {registrationMessage && (
        <p className="text-red-500 mb-4">{registrationMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dateOfBirth" className="block text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="country" className="block text-gray-700">
            Country
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="form-select mt-1 block w-full"
            required
          >
            <option value="">Select your country</option>
            {COUNTRIES.map((c) => {
              return <option value={c}>{c}</option>;
            })}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}
