import mongoose from "mongoose";
import { config } from "./config.js";

// MongoDB Atlas 연결
mongoose
  .connect(config.db.host, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

export default mongoose;
