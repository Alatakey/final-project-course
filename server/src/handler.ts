import mongoose from "mongoose";
import { ResultValue, ResultBool, SignData } from "./interfaces";
import { UserDoc, UserModel } from "./schemas/users-schema";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./consts";

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
): Promise<ResultValue<UserDoc>> {
  try {
    const user = await UserModel.findOne({ name: name.toLowerCase() });

    if (!user) {
      return {
        data: null,
        error: `User ${name} not found`,
      };
    }
    return { data: user };
  } catch (error) {
    console.error("Error fetching user from the database:", error);
    throw new Error("Failed to fetch user from the database");
  }
}
export async function getUserFromDbByEmail(
  email: string
): Promise<ResultValue<UserDoc>> {
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return {
        data: null,
        error: `User ${email} not found`,
      };
    }
    return { data: user };
  } catch (error) {
    console.error("Error fetching user from the database:", error);
    throw new Error("Failed to fetch user from the database");
  }
}

interface AddUserParams {
  name: string;
  date: string;
  country: string;
  email: string;
  password: string;
}
export async function addUserToDb(params: AddUserParams): Promise<ResultBool> {
  // Hash the password
  const hashedPassword = hashPassword(params.password);

  const smallerName = params.name.toLowerCase();
  // Create a new user document
  const newUser: UserDoc = new UserModel({
    name: smallerName,
    date: dayjs(params.date).toDate(),
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
  } catch (error) {
    // Handle any errors that occur during saving
    console.error("Error adding user to database:", error);
    return { isOk: false, error: "Failed to add user to database" };
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
      $or: [{ name: userName }, { email }],
    });

    // If a user with the given userName or email is found, return true
    if (existingUser) {
      return true;
    }
    // If no user is found with the given userName or email, return false
    return false;
  } catch (error) {
    // If an error occurs during the database operation, log it and return false
    console.error("Error checking if user exists:", error);
    return false;
  }
}

export async function getLoginToken(
  userName: string,
  password: string
): Promise<ResultValue<string>> {
  // Find user by username
  const smallerName = userName.toLowerCase();
  const foundUserRes: ResultValue<UserDoc> = await getUserFromDbByName(
    smallerName
  );

  if (!foundUserRes.data) {
    return {
      data: null,
      error: "Invalid username or password",
    };
  }

  const foundUser: UserDoc = foundUserRes.data;

  // Check password
  const passwordMatch: boolean = await bcrypt.compare(
    password,
    foundUser.hashedPassword
  );

  if (!passwordMatch) {
    return {
      data: null,
      error: "Invalid username or password",
    };
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

  return { data: token };
}
