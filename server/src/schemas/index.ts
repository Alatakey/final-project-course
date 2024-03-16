import mongoose, { Schema, Document, Model } from "mongoose";

const USER_TABLE_NAME = "users";
export interface UserDoc extends Document {
  name: string;
  id: string;
}

export const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true, unique: true },
});

export const UserModel: Model<UserDoc> = mongoose.model<UserDoc>(
  USER_TABLE_NAME,
  UserSchema
);
