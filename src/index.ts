import express from "express";
import config from "config";
import cookieParser from "cookie-parser";
import connectDatabase from "./utils/connectDatabase";
import routes from "./routes";

const app = express();
const port = config.get<number>("port");
const host = config.get<string>("host");

app.use(cookieParser());
app.use(express.json());

const start = async () => {
  await connectDatabase();
  app.listen(port, host, () => {
    console.log(`App running on http://${host}:${port}...`);
  });
  routes(app);
};
start();
