require("dotenv").config();
const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const discussionRoutes = require("./routes/discussion");

const aiRoutes = require("./routes/ai");

const PORT = process.env.PORT || 5000;
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

// ✅ DATABASE CONNECT
database.connect();

// ✅ MIDDLEWARES (FIXED ORDER 🔥)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// ✅ CLOUDINARY
cloudinaryConnect();

// ✅ ROUTES (AFTER MIDDLEWARES 🔥)
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/discussion", discussionRoutes);

// ✅ DEFAULT ROUTE
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

// ✅ START SERVER
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});