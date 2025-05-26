import mongoose, { Schema, Document, Model, mongo } from "mongoose";

interface IUser extends Document {
  name: string;
  gmail: string;
  phone: number;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, require: true },
  gmail: { type: String, require: true },
  phone: { type: Number, require: true },
  password: { type: String, require: true },
},{
  timestamps: true  // 👈 this adds createdAt and updatedAt
});

const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
