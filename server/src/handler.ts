import mongoose from "mongoose";
import { SignData, UserResponse } from "./interfaces";
import { UserDoc, UserModel } from "./schemas/users-schema";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./consts";
import { Result, err, ok } from "neverthrow";
import BlogModel, { BlogDocument } from "./schemas/blog-schema";

export function removeSensitiveDataFromUser(userDoc: UserDoc): UserResponse {
  const { hashedPassword, ...user } = userDoc.toObject();
  return user;
}

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
    userId: foundUser._id,
    name: foundUser.name,
    email: foundUser.email,
  };

  // Generate JWT token
  const token: string = jwt.sign(objectToSign, JWT_SECRET, {
    expiresIn: "24h",
  });

  return ok(token);
}

interface CreateBlogParams {
  userId: string;
  text: string;
}

export async function createBlog(
  params: CreateBlogParams
): Promise<Result<BlogDocument, string>> {
  try {
    const newBlog = new BlogModel({ ...params });
    const savedBlog = await newBlog.save();
    return ok(savedBlog);
  } catch (error) {
    console.error("Error creating blog:", error.message);
    return err("Failed to create blog");
  }
}

export async function editBlog(
  blogId: string,
  userId: string,
  newText: string
): Promise<Result<BlogDocument | null, string>> {
  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      blogId,
      { text: newText },
      { new: true }
    );
    if (!updatedBlog) {
      return err("Blog not found");
    }
    return ok(updatedBlog);
  } catch (error) {
    console.error("Error editing blog:", error.message);
    return err("Failed to edit blog");
  }
}

export async function deleteBlog(
  blogId: string,
  userId: string
): Promise<Result<boolean, string>> {
  try {
    const deletedBlog = await BlogModel.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return err("Blog not found");
    }
    return ok(true);
  } catch (error) {
    console.error("Error deleting blog:", error.message);
    return err("Failed to delete blog");
  }
}

export async function fetchBlogsByUserId(
  userId: string
): Promise<Result<BlogDocument[], string>> {
  try {
    const blogs = await BlogModel.find({ userId });
    return ok(blogs);
  } catch (error) {
    console.error("Error fetching blogs by userId:", error.message);
    return err("Failed to fetch blogs by userId");
  }
}

export async function getAllUsersWithBlogs(): Promise<
  Result<UserDoc[], string>
> {
  try {
    const usersWithBlogs: UserDoc[] = await BlogModel.aggregate([
      {
        $group: {
          _id: "$userId",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: "$user._id",
          name: "$user.name",
          date: "$user.date",
          country: "$user.country",
          email: "$user.email",
        },
      },
    ]);

    return ok(usersWithBlogs || []);
  } catch (error) {
    console.error("Error fetching users with blogs:", error.message);
    return err("Failed to fetch users with blogs");
  }
}
