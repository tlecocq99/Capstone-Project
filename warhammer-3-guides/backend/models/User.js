import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  birthYear: { type: Number, required: true },
  savedFactions: [{ type: String }], // Array of faction slugs
});

export default mongoose.model("User", userSchema);
