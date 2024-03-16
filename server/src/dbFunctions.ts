import mongoose from "mongoose";
import { ResultValue, ResultBool } from "./interfaces";
import { UserDoc, UserModel } from "./schemas/users-schema";
import bcrypt from "bcrypt";
import dayjs from "dayjs";

export async function getAllUsersFromDb(): Promise<UserDoc[]> {
  try {
    const usersRes: UserDoc[] = await UserModel.find({});
    return usersRes; // Return the result of the query
  } catch (error) {
    console.error("Error fetching users from the database:", error);
    throw new Error("Failed to fetch users from the database");
  }
}

export async function getUserFromDbById(
  id: string
): Promise<ResultValue<UserDoc>> {
  try {
    const user = await UserModel.findOne({ id });
    if (!user) {
      return {
        data: null,
        error: `User ${id} not found`,
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
  const hashedPassword = await bcrypt.hash(params.password, 10);

  // Create a new user document
  const newUser: UserDoc = new UserModel({
    name: params.name,
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
