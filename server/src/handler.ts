import mongoose from "mongoose";
import { SignData } from "./interfaces";
import { UserDoc, UserModel } from "./schemas/users-schema";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./consts";
import { Result, err, ok } from "neverthrow";

export async function getAllUsersFromDb(): Promise<UserDoc[]> {
  try {
    const usersRes: UserDoc[] = await UserModel.find({});
    return usersRes; // Return the result of the query
  } catch (error) {
    console.error("Error fetching users from the database:", error);
    throw new Error("Failed to fetch users from the database");
  }
}

export async function getUserFromDbByName(
  name: string
): Promise<Result<UserDoc, string>> {
  try {
    const user = await UserModel.findOne({ name: name.toLowerCase() });

    if (!user) {
      return err(`User ${name} not found`);
    }
    return ok(user);
  } catch (error) {
    return err("Failed to fetch user from the database");
  }
}
export async function getUserFromDbByEmail(
  email: string
): Promise<Result<UserDoc, string>> {
  try {
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return err(`User ${email} not found`);
    }
    return ok(user);
  } catch (error) {
    return err("Failed to fetch user from the database");
  }
}

interface AddUserParams {
  name: string;
  date: string;
  country: string;
  email: string;
  password: string;
}
export async function addUserToDb(
  params: AddUserParams
): Promise<Result<void, string>> {
  // Hash the password
  const hashedPassword = hashPassword(params.password);

  // Create a new user document
  const newUser: UserDoc = new UserModel({
    name: params.name.toLowerCase(),
    date: dayjs(params.date).toDate(),
    country: params.country,
    email: params.email.toLowerCase(),
    hashedPassword,
  });

  const userExists = await isUserExistsInDb(newUser.name, newUser.email);
  if (userExists) {
    return err("User already exists");
  }
  try {
    // Save the user to the database
    await newUser.save();
    return ok(void 0);
  } catch (error) {
    return err("Failed to add user to database");
  }
}

export function hashPassword(password: string) {
  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
}

export async function isUserExistsInDb(
  userName: string,
  email: string
): Promise<boolean> {
  try {
    // Find a user with the given userName or email
    const existingUser = await UserModel.findOne({
      $or: [{ name: userName.toLowerCase() }, { email: email.toLowerCase() }],
    });

    // If a user with the given userName or email is found, return true
    if (existingUser) {
      return true;
    }
    // If no user is found with the given userName or email, return false
    return false;
  } catch (error) {
    // If an error occurs during the database operation, log it and return false
    console.error("Error checking if user exists:", error.message);
    return false;
  }
}

export async function getLoginToken(
  userName: string,
  password: string
): Promise<Result<string, string>> {
  // Find user by username
  const foundUserRes: Result<UserDoc, string> = await getUserFromDbByName(
    userName.toLowerCase()
  );

  if (foundUserRes.isErr()) {
    return err("Invalid username or password");
  }

  const foundUser: UserDoc = foundUserRes.value;

  // Check password
  const passwordMatch: boolean = await bcrypt.compare(
    password,
    foundUser.hashedPassword
  );

  if (!passwordMatch) {
    return err("Invalid username or password");
  }

  // Create object to sign
  const objectToSign: SignData = {
    name: foundUser.name,
    email: foundUser.email,
  };

  // Generate JWT token
  const token: string = jwt.sign(objectToSign, JWT_SECRET, {
    expiresIn: "24h",
  });

  return ok(token);
}
