import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();

app.use(cors());
// we need these two lines, otherwise there is no middleware!
app.use(express.json());
app.use(express.urlencoded());
const __dirname = path.resolve();
app.use("/", express.static(path.join(__dirname, "/client/build")));
routes(app);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const PORT = process.env.PORT || 5000;

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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
