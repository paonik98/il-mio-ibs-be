import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "./user.model";

export interface IArticle extends Document {
  title: string;
  content: string;
  author: Types.ObjectId | IUser;
  userName: string;
  userAge: number;
  avatarColor: string;
  createdAt: Date;
}

const ArticleSchema = new Schema<IArticle>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: { type: String, required: true },
  userAge: { type: Number, required: true },
  avatarColor: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IArticle>("Article", ArticleSchema);
