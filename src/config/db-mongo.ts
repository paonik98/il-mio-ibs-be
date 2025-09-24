import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/mydb"
    );
    console.log("✅ MongoDB connesso");
  } catch (err) {
    console.error("❌ Errore connessione MongoDB", err);
    process.exit(1);
  }
};
