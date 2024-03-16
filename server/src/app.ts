import express, { Express, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { DB_CONNECTION_URL } from "./consts";
import bcrypt from "bcrypt";
import {
  addUserToDb,
  getAllUsersFromDb,
  getUserFromDbById,
} from "./dbFunctions";
import { UserDoc, UserModel } from "./schemas/users-schema";
import cors from "cors";
import morgan from "morgan";
import dayjs from "dayjs";

export async function startExpressServer() {
  // Create Express app
  const app: Express = express();
  const port: number = 3000;
  //connect to db
  await mongoose.connect(DB_CONNECTION_URL);

  // Middleware to parse JSON bodies
  app.use(express.json());

  // Enable CORS for all routes
  app.use(cors());

  // Log all requests and responses
  app.use(morgan("dev"));

  // Error handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("An error occurred:", err);
    res.status(500).send("Internal Server Error");
  });

  // Define a routes

  /**
   * Check if the server is alive
   * Request should be a GET request
   * e.g. /
   */
  app.get("/", (req: Request, res: Response) => {
    res.send("Alive!");
  });

  /**
   * Get all registered users
   * Request should be a GET request
   * e.g. /users
   */
  app.get("/users", async (req: Request, res: Response) => {
    const users = await getAllUsersFromDb();

    // Remove hashedPassword field from each user object
    const usersWithoutHashedPassword = users.map((user: UserDoc) => {
      const { hashedPassword, ...userWithoutHashedPassword } = user.toObject();
      return userWithoutHashedPassword;
    });

    res.send({
      users: usersWithoutHashedPassword,
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * Get a user by id
   * Request should be a GET request with the user id as a path parameter
   * e.g. /users/123
   */

  app.get("/users/:id", async (req: Request, res: Response) => {
    const userId = req.params.id;
    const result = await getUserFromDbById(userId);

    if (!result.data) {
      return res.status(404).send(result.error);
    }

    // Remove hashedPassword field from the user object
    const { hashedPassword, ...userWithoutHashedPassword } =
      result.data.toObject();

    res.send(userWithoutHashedPassword);
  });

  /**
   * Register a new user
   * Request should be a POST request with the following body:
   * - name: string
   * - date: Date
   * - country: string
   * - email: string
   * - password: string
   * e.g. {
   *   "name": "John",
   *   "date": "2020-01-01",
   *   "country": "USA",
   *   "email": "pCnXp@example.com",
   *   "password": "password"
   * }
   */
  app.post("/register", async (req: Request, res: Response) => {
    const { name, date, country, email, password } = req.body;

    // Validate all fields
    const missingFields: string[] = [];

    // Check each field individually and add missing fields to the array
    if (!name) missingFields.push("name");
    if (!date) missingFields.push("date");
    if (!country) missingFields.push("country");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");

    // If any fields are missing, return the list of missing fields in the response
    if (missingFields.length > 0) {
      const error = `Missing fields: ${missingFields.join(", ")}`;
      return res.status(400).send(error);
    }

    // Save the user document to the database
    const result = await addUserToDb({
      name,
      date,
      country,
      email,
      password,
    });

    if (!result.isOk) {
      return res.status(500).send(result.error);
    }
    res.send("User registered successfully.");
  });

  // Start the Express server
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
