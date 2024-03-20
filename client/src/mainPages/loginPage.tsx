import React, { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { sendLoginToServer } from "../request";
import useToken, { UserToken } from "../hooks/useToken";

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
  errorMessage?: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUserToken: setToken } = useToken();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const handleLogin = async (username: string, password: string) => {
    // Add your login authentication logic here
    const result = await sendLoginToServer(username, password);
    if (result.isOk()) {
      // Login successful
      console.log("Login successful");
      const tokenObject: UserToken = {
        user: result.value.user,
        token: result.value.token,
      };
      setToken(tokenObject);
      navigate("/homePage");
      window.location.reload();
    } else {
      // Login failed
      console.log("Login failed");
      setErrorMessage(result.error);
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleLogin} errorMessage={errorMessage} />
    </div>
  );
}

export function LoginForm({ onSubmit, errorMessage }: LoginFormProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    // Navigate to the register page or show the register form
    console.log("Register clicked");
    navigate("/register");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>

        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
