import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import routes from "./routes/index.js";

const app = express();

app.use(cors());

const MONGODB_API_URL = `mongodb+srv://jameshuang:haircutuberjameshuang@haircut-uber-db.zlcc3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(MONGODB_API_URL, {
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
