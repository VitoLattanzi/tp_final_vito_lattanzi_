import mongoose from "mongoose";
import connectToMongoDB from "./config/configMongoDB.config.js";
import User from "./models/User.model.js";

await connectToMongoDB();

try {
  const newUser = new User({
    name: "Juan Pérez",
    email: "juan@example.com",
    passwordHash: "hash-de-ejemplo", // en el real sería un hash bcrypt
    avatarUrl: "https://example.com/avatar.jpg"
  });

  const savedUser = await newUser.save();
  console.log("🟢 Usuario guardado:", savedUser);
} catch (err) {
  console.error("❌ Error al guardar usuario:", err.message);
}

await mongoose.connection.close();