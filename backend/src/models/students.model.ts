import mongoose, { Schema, Document } from "mongoose";

const secret = Math.floor(100000 + Math.random() * 900000);

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  class: number;
  section: string;
  secret: string;
  user: string;
  avatar: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  class: { type: Number, required: true },
  section: { type: String, required: true },
  secret: { type: String, default: secret },
  user: { type: String, defaut: "student" },
  avatar: {
    type: String,
    default: "https://www.gravatar.com/avatar/?d=mp&s=630",
  },
});

export default mongoose.model<IUser>("students", UserSchema);
