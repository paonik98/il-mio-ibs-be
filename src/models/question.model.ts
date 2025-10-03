import { Schema, model, Document } from "mongoose";

export interface IQuestion extends Document {
  text: string;
  isActive: boolean;
}

const questionSchema = new Schema<IQuestion>({
  text: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export const Question = model<IQuestion>("Question", questionSchema);
