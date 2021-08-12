import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import routes from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to haircut-uber API");
});

app.use(cors());

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_API_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`MongoDB database connection established successfully.`);
  })
  .catch((err) => console.log(err));

routes(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
