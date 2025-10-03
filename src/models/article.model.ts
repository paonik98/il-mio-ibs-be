import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "./user.model";
import { AvatarColor } from "../enums/avatar-color.enum";
import { AcceptedStatus } from "../enums/accepted-status.enum";
import { IQuestion } from "./question.model";

export interface IQuestionAnswer {
  questionId: Types.ObjectId | IQuestion;
  answer: string;
}

export interface IArticle extends Document {
  title: string;
  content: IQuestionAnswer[];
  author: Types.ObjectId | IUser;
  userName: string;
  userAge: number;
  avatarColor: AvatarColor;
  acceptedStatus: AcceptedStatus;
  createdAt: Date;
}

const qaSchema = new Schema<IQuestionAnswer>({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const ArticleSchema = new Schema<IArticle>({
  title: { type: String, required: true },
  content: {
    type: [qaSchema],
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: { type: String, required: true },
  userAge: { type: Number, required: true },
  avatarColor: { type: String, required: true },
  acceptedStatus: { type: String, default: AcceptedStatus.Pending },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IArticle>("Article", ArticleSchema);
