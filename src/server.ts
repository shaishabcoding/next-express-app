import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

const port = 3000;
let server: Server;

async function run() {
  try {
    await mongoose.connect(config.db_url as string);
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

run();
