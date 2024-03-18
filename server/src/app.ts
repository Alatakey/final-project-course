import express, { Express, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { DB_CONNECTION_URL } from "./consts";
import {
  addUserToDb,
  createBlog,
  deleteBlog,
  editBlog,
  getAllUsersFromDb,
  getAllUsersWithBlogs,
  getLoginToken,
  getUserFromDbByName,
  removeSensitiveDataFromUser,
} from "./handler";
import { UserDoc } from "./schemas/users-schema";
import cors from "cors";
import morgan from "morgan";
import colorfulMorganFormat from "./utils/morgan";
import { validateUser } from "./utils/middleware";
import { SignData } from "./interfaces";

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
  app.use(morgan(colorfulMorganFormat));

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
      return removeSensitiveDataFromUser(user);
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
    const result = await getUserFromDbByName(userId);

    if (result.isErr()) {
      return res.status(404).send(result.error);
    }

    // Remove hashedPassword field from the user object
    const userWithoutHashedPassword = removeSensitiveDataFromUser(result.value);

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

    if (result.isErr()) {
      return res.status(400).send(result.error);
    }
    res.send("User registered successfully.");
  });

  app.post("/login", async (req: Request, res: Response) => {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).send("Missing name or password");
    }
    const loginTokenRes = await getLoginToken(name, password);

    if (loginTokenRes.isErr()) {
      return res.status(401).send(loginTokenRes.error);
    }
    const token = loginTokenRes.value;

    // Return token
    res.json({ token, name });
  });

  // 1. Endpoint to fetch an author's blogs
  app.get("/blogs/:userId", async (req: Request, res: Response) => {
    const userId = req.params.userId;

    // Your logic to fetch author's blogs
  });

  // 2. Endpoint to create a new blog by validated user
  app.post("/blogs", validateUser, async (req: Request, res: Response) => {
    const signData: SignData = req.signedData;
    const { text } = req.body;

    const result = await createBlog({ userId: signData.userId, text });
    if (result.isErr()) {
      return res.status(500).send(result.error);
    }
    const newBlog = result.value;
    return res.status(201).json(newBlog);
  });

  // 3. Endpoint to edit a blog by validated user
  app.put("/blogs/:id", validateUser, async (req: Request, res: Response) => {
    const { id } = req.params;
    const signData = req.signedData;
    const { text } = req.body;

    // Check if the user is the owner of the blog

    const result = await editBlog(id, signData.userId, text);
    if (result.isErr()) {
      return res.status(500).send(result.error);
    }
    const editedBlog = result.value;
    return res.status(200).json(editedBlog);
  });

  // 4. Endpoint to delete a blog by validated user
  app.delete(
    "/blogs/:id",
    validateUser,
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const signData = req.signedData;

      // Check if the user is the owner of the blog

      const result = await deleteBlog(id, signData.userId);
      if (result.isErr()) {
        return res.status(500).send(result.error);
      }
      return res.status(204).send();
    }
  );

  app.get("/users-with-blogs", async (req: Request, res: Response) => {
    try {
      const usersWithBlogsRes = await getAllUsersWithBlogs();
      if (usersWithBlogsRes.isErr()) {
        return res.status(500).send(usersWithBlogsRes.error);
      }
      const usersWithBlogsWithoutSensitiveData = usersWithBlogsRes.value.map(
        (user) => {
          return removeSensitiveDataFromUser(user);
        }
      );
      res.send(usersWithBlogsWithoutSensitiveData);
    } catch (error) {
      console.error("Error fetching users with blogs:", error.message);
      res.status(500).send("Internal Server Error");
    }
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
