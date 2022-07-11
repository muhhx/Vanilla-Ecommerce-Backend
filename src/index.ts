const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
import connectDatabase from "./utils/connectDatabase";
import routes from "./routes";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const host = "localhost";
const baseUrl = process.env.BASE_URL as string;
const dbUri = process.env.MONGODB_URI as string;

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const start = async () => {
  await connectDatabase(dbUri);
  app.listen(port, () => {
    console.log(`App running on http://${host}:${port}...`);
  });
  routes(app);
};
start();
