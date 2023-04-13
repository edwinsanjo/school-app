import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  admin: boolean;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
});

// Export the model and return your IUser interface
export default mongoose.model<IUser>("User", UserSchema);
