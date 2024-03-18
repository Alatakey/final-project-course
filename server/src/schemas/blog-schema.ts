import mongoose, { Schema, Document } from "mongoose";

interface Blog {
  userId: Schema.Types.ObjectId;
  date: Date;
  text: string;
}

export interface BlogDocument extends Document, Blog {}

const BlogSchema: Schema<BlogDocument> = new Schema<BlogDocument>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  text: { type: String, required: true },
});

const BlogModel = mongoose.model<BlogDocument>("Blog", BlogSchema);

export default BlogModel;
