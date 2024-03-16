import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import { DB_CONNECTION_URL } from "./consts";
import bcrypt from "bcrypt";
import {
  addUserToDb,
  getAllUsersFromDb,
  getUserFromDbById,
} from "./dbFunctions";
import { UserDoc, UserModel } from "./schemas";
import cors from "cors";
import morgan from "morgan";

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
    res.send({
      users: users,
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

    res.send(result.data);
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
    if (!name || !date || !country || !email || !password) {
      return res.status(400).send("All fields are required.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser: UserDoc = new UserModel({
      name,
      date,
      country,
      email,
      hashedPassword,
    });

    // Save the user document to the database
    const result = await addUserToDb(newUser);

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
