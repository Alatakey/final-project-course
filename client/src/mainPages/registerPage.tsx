import { useState } from "react";

interface FormProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface User {
  id: number;
  username: string;
  email: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormProps>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<FormProps>>({});
  const [users, setUsers] = useState<User[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error message when user starts typing in a field
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Generate a unique ID for the new user
      const id = users.length + 1;
      const newUser: User = {
        id,
        username: formData.username,
        email: formData.email,
      };
      setUsers([...users, newUser]);

      // Clear form fields after successful registration
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: Partial<FormProps> = {};

    if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
      isValid = false;
    }

    if (!formData.email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if (formData.password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
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
              className={`form-input mt-1 block w-full ${
                errors.username && "border-red-500"
              }`}
              required
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
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
              className={`form-input mt-1 block w-full ${
                errors.email && "border-red-500"
              }`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
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
              className={`form-input mt-1 block w-full ${
                errors.password && "border-red-500"
              }`}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-input mt-1 block w-full ${
                errors.confirmPassword && "border-red-500"
              }`}
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Register
          </button>
        </form>
      </div>
      <div className="flex flex-wrap justify-center">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded shadow-md m-2">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded mt-2 mr-2"
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mt-2"
              onClick={() => {
                /* Add edit functionality here */
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
