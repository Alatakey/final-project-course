import mongoose, { Schema, Document, Model } from "mongoose";
const USER_TABLE_NAME = "users";

// Define the TypeScript interface
interface User {
  name: string;
  date: Date;
  country: string;
  email: string;
  hashedPassword: string;
}

// Define the Mongoose schema
const UserSchemaFields: Record<keyof User, any> = {
  name: { type: String, required: true },
  date: { type: Date, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
};
const UserSchema = new Schema(UserSchemaFields);

// Define the Mongoose document interface based on the User interface
interface UserDoc extends User, Document {}

// Define the Mongoose model
const UserModel: Model<UserDoc> = mongoose.model<UserDoc>(
  USER_TABLE_NAME,
  UserSchema
);

export { User, UserDoc, UserModel };
