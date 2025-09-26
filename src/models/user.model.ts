import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { AvatarColor } from "../enums/avatar-color.enum";

export interface IUser extends Document {
  name: string;
  surname: string;
  email: string;
  password: string;
  avatarColor: AvatarColor;
  dateOfBirth: Date;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarColor: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Hash della password prima di salvare
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Metodo per confrontare password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
