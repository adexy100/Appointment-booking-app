const express = require ("express");
const dotenv = require ("dotenv");
const colors = require ("colors");
const cors = require ("cors");

const connectDB = require "./config/db.js";
const authRouter = require "./routes/authRoute.js";

dotenv.config();

connectDB();

const app = express();

// cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

app.use(express.json());

// Use Routes
app.use("/api/users", authRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);