const mongoose = require("mongoose");

exports.connect = () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.log("❌ MONGO_URI not found in .env");
    process.exit(1);
  }

  mongoose
    .connect(uri)
    .then(() => console.log("✅ DB Connected"))
    .catch((err) => {
      console.log("❌ DB Connection Failed");
      console.error(err);
      process.exit(1);
    });
};