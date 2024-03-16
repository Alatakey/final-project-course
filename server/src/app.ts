import express, { Express, Request, Response } from "express";
import { User } from "./interfaces";
import mongoose from "mongoose";
import { DB_CONNECTION_URL } from "./consts";
import {
  addUserToDb,
  getAllUsersFromDb,
  getUserFromDbById,
} from "./dbFunctions";

export async function startExpressServer() {
  // Create Express app
  const app: Express = express();
  const port: number = 3000;
  //connect to db
  await mongoose.connect(DB_CONNECTION_URL);

  // Middleware to parse JSON bodies
  app.use(express.json());

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
   * Check if the server is alive
   * Request should be a GET request
   * e.g. /check
   */
  app.get("/check", (req: Request, res: Response) => {
    res.send("Check!");
  });

  /**
   * Say hello to a user
   * Request should be a GET request with the following query parameters:
   * - id: string
   * - name: string
   * e.g. /hello?id=123&name=John
   */
  app.get("/hello", (req: Request, res: Response) => {
    const { id, name } = req.query;

    if (!id || !name) {
      return res.status(400).send("Both id and name are required.");
    }

    const greeting = `Hello ${id} ${name}`;
    res.send(greeting);
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
   * Request should be a JSON object with the following structure:
   * {
   *  "id": "string",
   *  "name": "string"
   *  }
   */
  app.post("/register", async (req: Request, res: Response) => {
    const { id, name } = req.body;
    if (!id || !name) {
      return res.status(400).send("Both id and name are required.");
    }

    const user: User = { id, name };

    const result = await addUserToDb(user);
    if (!result.isOk) {
      return res.status(404).send(result.error);
    }
    res.send(`User ${id} has registered successfully`);
  });

  // Start the Express server
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
