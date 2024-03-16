import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

const USER_TABLE_NAME = "users";

export interface UserDoc extends Document {
  name: string;
  id: mongoose.Types.ObjectId;
  date: Date;
  country: string;
  email: string;
  hashedPassword: string;
}

export const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
});

export const UserModel: Model<UserDoc> = mongoose.model<UserDoc>(
  USER_TABLE_NAME,
  UserSchema
);
