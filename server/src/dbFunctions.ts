import mongoose from "mongoose";
import { ResultValue, ResultBool, User } from "./interfaces";
import { UserDoc, UserModel } from "./schemas";

export async function getAllUsersFromDb(): Promise<User[]> {
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
): Promise<ResultValue<User>> {
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

export async function addUserToDb(user: User): Promise<ResultBool> {
  const userExists = await isUserExistsInDb(user.id);
  if (userExists === true) {
    return {
      isOk: false,
      error: `User ${user.id} already exists`,
    };
  }
  const newUser = new UserModel(user);
  await newUser.save();
  return { isOk: true };
}

export async function isUserExistsInDb(id: string): Promise<boolean> {
  try {
    // Find a user with the given id
    const existingUser = await UserModel.findOne({ id });

    // If a user with the given id is found, return true
    if (existingUser) {
      return true;
    }
    // If no user is found with the given id, return false
    return false;
  } catch (error) {
    // If an error occurs during the database operation, log it and return false
    console.error("Error checking if user exists:", error);
    return false;
  }
}
