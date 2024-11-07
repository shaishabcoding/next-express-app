import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";
import { seedSuperAdmin } from "./app/db";

let server: Server;

async function run() {
  try {
    await mongoose.connect(config.db_url);
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
    await seedSuperAdmin();
  } catch (error) {
    console.log(error);
  }
}

run();

process.on("uncaughtException", (err: any) => {
  console.error("🔥 Uncaught Exception detected:", err?.message);
  console.error(err?.stack);
  console.log("🔥 Shutting down due to uncaught exception...");

  process.exit(1);
});

process.on("unhandledRejection", (err: any) => {
  console.error("🔥 Unhandled Rejection detected:", err?.message);
  console.error(err?.stack);
  console.log("🔥 Shutting down due to unhandled rejection...");

  if (server) {
    server.close(() => {
      console.log("💀 Server closed. Exiting process...");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("SIGTERM", () => {
  console.log("💥 SIGTERM received. Shutting down gracefully...");
  if (server) {
    server.close(() => {
      console.log("💀 Server closed. Exiting process...");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});
