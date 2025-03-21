import mongoose from "../database.js";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    account: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, unique: true, required: true },
    zip_code: { type: String, required: true },
  },
  {
    versionKey: false, // `_v` 필드 비활성화
    timestamps: true, // `createdAt`, `updatedAt` 자동 추가
  }
);

const User = mongoose.model("User", UserSchema);

// CRUD 기능
export const createUser = async (data) => await User.create(data);
export const getUsers = async () => await User.find();
export const getUserById = async (id) => await User.findById(id);
export const updateUser = async (id, data) =>
  await User.findByIdAndUpdate(id, data, { new: true });
export const deleteUser = async (id) => await User.findByIdAndDelete(id);

export default User;
