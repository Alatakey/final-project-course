import mongoose from "mongoose";
import { ResultValue, ResultBool } from "./interfaces";
import { UserDoc, UserModel } from "./schemas";

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

export async function addUserToDb(userDoc: UserDoc): Promise<ResultBool> {
  const userExists = await isUserExistsInDb(userDoc.name, userDoc.email);
  if (userExists === true) {
    return {
      isOk: false,
      error: `User ${userDoc.id} already exists`,
    };
  }
  const newUser = new UserModel(userDoc);
  await newUser.save();
  return { isOk: true };
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
