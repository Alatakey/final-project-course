import express, {Express, Request, Response} from 'express';
import {PI} from "./consts";
import {User} from "./interfaces";

// States & Variables
let counter: number = 0;
const registeredUsers: User[] = [];

export function startExpressServer() {
    // Create Express app
    const app: Express = express();
    const port: number = 3000;

    // Middleware to parse JSON bodies
    app.use(express.json());

    // Define a routes

    /**
     * Check if the server is alive
     * Request should be a GET request
     * e.g. /
     */
    app.get('/', (req: Request, res: Response) => {
        res.send('Alive!');
    });

    /**
     * Check if the server is alive
     * Request should be a GET request
     * e.g. /check
     */
    app.get('/check', (req: Request, res: Response) => {
        res.send('Check!');
    });

    /**
     * Get the value of PI
     * Request should be a GET request
     * e.g. /pi
     */
    app.get('/pi', (req: Request, res: Response) => {
        res.send(`PI is approximately ${PI}`);
    });

    /**
     * Say hello to a user
     * Request should be a GET request with the following query parameters:
     * - id: string
     * - name: string
     * e.g. /hello?id=123&name=John
     */
    app.get('/hello', (req: Request, res: Response) => {
        const { id, name } = req.query;

        if (!id || !name) {
            return res.status(400).send('Both id and name are required.');
        }

        const greeting = `Hello ${id} ${name}`;
        res.send(greeting);
    });

    /**
     * Get all registered users
     * Request should be a GET request
     * e.g. /users
     */
    app.get('/users', (req: Request, res: Response) => {
        res.send({
            users: registeredUsers,
            timestamp: new Date().toISOString(),
        });
    });

    /**
     * Get a user by id
     * Request should be a GET request with the user id as a path parameter
     * e.g. /users/123
     */
    app.get('/users/:id', (req: Request, res: Response) => {
        const userId = req.params.id;
        const user = registeredUsers.find(u => u.id === userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.send(user);
    });


    /**
     * Register a new user
     * Request should be a JSON object with the following structure:
     * {
     *  "id": "string",
     *  "name": "string"
     *  }
     */
    app.post('/register', (req: Request, res: Response) => {
        const { id, name } = req.body;
        if (!id || !name) {
            return res.status(400).send('Both id and name are required.');
        }

        const user: User = { id, name };

        if (registeredUsers.some((u) => u.id === user.id)) {
            return res.status(400).send(`User ${id} already exists`);
        }

        registeredUsers.push(user);
        res.send('User registered');
    });

    /**
     * Reset the list of registered users
     * Request should be a POST request
     * e.g. /reset-users
     */
    app.post('/reset-users', (req: Request, res: Response) => {
        registeredUsers.length = 0; // Reset the contents of the array
        res.send('Users have been reset');
    });

    /**
     * Get the current value of the counter
     * Request should be a GET request
     * e.g. /counter
     */
    app.get('/counter', (req: Request, res: Response) => {
        res.send(`Counter is at ${counter}`);
        counter += 1;
    });

    /**
     * Reset the counter to 0
     * Request should be a POST request
     * e.g. /reset-counter
     */
    app.post('/reset-counter', (req: Request, res: Response) => {
        counter = 0;
        res.send('Counter has been reset');
    });

    // Start the Express server
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}
