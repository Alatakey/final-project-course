"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoginToken = exports.isUserExistsInDb = exports.addUserToDb = exports.getUserFromDbByEmail = exports.getUserFromDbByName = exports.getAllUsersFromDb = void 0;
const users_schema_1 = require("./schemas/users-schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dayjs_1 = __importDefault(require("dayjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const consts_1 = require("./consts");
async function getAllUsersFromDb() {
    try {
        const usersRes = await users_schema_1.UserModel.find({});
        return usersRes; // Return the result of the query
    }
    catch (error) {
        console.error("Error fetching users from the database:", error);
        throw new Error("Failed to fetch users from the database");
    }
}
exports.getAllUsersFromDb = getAllUsersFromDb;
async function getUserFromDbByName(name) {
    try {
        const user = await users_schema_1.UserModel.findOne({ name: name });
        if (!user) {
            return {
                data: null,
                error: `User ${name} not found`,
            };
        }
        return { data: user };
    }
    catch (error) {
        console.error("Error fetching user from the database:", error);
        throw new Error("Failed to fetch user from the database");
    }
}
exports.getUserFromDbByName = getUserFromDbByName;
async function getUserFromDbByEmail(email) {
    try {
        const user = await users_schema_1.UserModel.findOne({ email: email });
        if (!user) {
            return {
                data: null,
                error: `User ${email} not found`,
            };
        }
        return { data: user };
    }
    catch (error) {
        console.error("Error fetching user from the database:", error);
        throw new Error("Failed to fetch user from the database");
    }
}
exports.getUserFromDbByEmail = getUserFromDbByEmail;
async function addUserToDb(params) {
    // Hash the password
    const hashedPassword = await bcrypt_1.default.hash(params.password, 10);
    // Create a new user document
    const newUser = new users_schema_1.UserModel({
        name: params.name,
        date: (0, dayjs_1.default)(params.date).toDate(),
        country: params.country,
        email: params.email,
        hashedPassword,
    });
    const userExists = await isUserExistsInDb(newUser.name, newUser.email);
    if (userExists) {
        return {
            isOk: false,
            error: `UserName ${newUser.name} or Email ${newUser.email} already exists`,
        };
    }
    try {
        // Save the user to the database
        await newUser.save();
        return { isOk: true };
    }
    catch (error) {
        // Handle any errors that occur during saving
        console.error("Error adding user to database:", error);
        return { isOk: false, error: "Failed to add user to database" };
    }
}
exports.addUserToDb = addUserToDb;
async function isUserExistsInDb(userName, email) {
    try {
        // Find a user with the given userName or email
        const existingUser = await users_schema_1.UserModel.findOne({
            $or: [{ name: userName }, { email }],
        });
        // If a user with the given userName or email is found, return true
        if (existingUser) {
            return true;
        }
        // If no user is found with the given userName or email, return false
        return false;
    }
    catch (error) {
        // If an error occurs during the database operation, log it and return false
        console.error("Error checking if user exists:", error);
        return false;
    }
}
exports.isUserExistsInDb = isUserExistsInDb;
async function getLoginToken(userName, password) {
    // Find user by username
    const foundUserRes = await getUserFromDbByName(userName);
    if (!foundUserRes.data) {
        return {
            data: null,
            error: "Invalid username or password",
        };
    }
    const foundUser = foundUserRes.data;
    // Check password
    const passwordMatch = await bcrypt_1.default.compare(password, foundUser.hashedPassword);
    if (!passwordMatch) {
        return {
            data: null,
            error: "Invalid username or password",
        };
    }
    // Create object to sign
    const objectToSign = {
        name: foundUser.name,
        email: foundUser.email,
    };
    // Generate JWT token
    const token = jsonwebtoken_1.default.sign(objectToSign, consts_1.JWT_SECRET, {
        expiresIn: "24h",
    });
    return { data: token };
}
exports.getLoginToken = getLoginToken;
//# sourceMappingURL=handler.js.map