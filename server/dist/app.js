"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startExpressServer = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const consts_1 = require("./consts");
const handler_1 = require("./handler");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
async function startExpressServer() {
    // Create Express app
    const app = (0, express_1.default)();
    const port = 3000;
    //connect to db
    await mongoose_1.default.connect(consts_1.DB_CONNECTION_URL);
    // Middleware to parse JSON bodies
    app.use(express_1.default.json());
    // Enable CORS for all routes
    app.use((0, cors_1.default)());
    // Log all requests and responses
    app.use((0, morgan_1.default)("dev"));
    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error("An error occurred:", err);
        res.status(500).send("Internal Server Error");
    });
    // Define a routes
    /**
     * Check if the server is alive
     * Request should be a GET request
     * e.g. /
     */
    app.get("/", (req, res) => {
        res.send("Alive!");
    });
    /**
     * Get all registered users
     * Request should be a GET request
     * e.g. /users
     */
    app.get("/users", async (req, res) => {
        const users = await (0, handler_1.getAllUsersFromDb)();
        // Remove hashedPassword field from each user object
        const usersWithoutHashedPassword = users.map((user) => {
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
    app.get("/users/:id", async (req, res) => {
        const userId = req.params.id;
        const result = await (0, handler_1.getUserFromDbByName)(userId);
        if (!result.data) {
            return res.status(404).send(result.error);
        }
        // Remove hashedPassword field from the user object
        const { hashedPassword, ...userWithoutHashedPassword } = result.data.toObject();
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
    app.post("/register", async (req, res) => {
        const { name, date, country, email, password } = req.body;
        // Validate all fields
        const missingFields = [];
        // Check each field individually and add missing fields to the array
        if (!name)
            missingFields.push("name");
        if (!date)
            missingFields.push("date");
        if (!country)
            missingFields.push("country");
        if (!email)
            missingFields.push("email");
        if (!password)
            missingFields.push("password");
        // If any fields are missing, return the list of missing fields in the response
        if (missingFields.length > 0) {
            const error = `Missing fields: ${missingFields.join(", ")}`;
            return res.status(400).send(error);
        }
        // Save the user document to the database
        const result = await (0, handler_1.addUserToDb)({
            name,
            date,
            country,
            email,
            password,
        });
        if (!result.isOk) {
            return res.status(400).send(result.error);
        }
        res.send("User registered successfully.");
    });
    app.post("/login", async (req, res) => {
        const { username, password } = req.body;
        const loginTokenRes = await (0, handler_1.getLoginToken)(username, password);
        if (!loginTokenRes.data) {
            return res.status(401).send(loginTokenRes.error);
        }
        const token = loginTokenRes.data;
        // Return token
        res.json({ token });
    });
    // Start the Express server
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}
exports.startExpressServer = startExpressServer;
//# sourceMappingURL=app.js.map