import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export default {
  port: +(process.env.PORT || 3000),
  db_url: process.env.DB_URL || "",
  node_env: process.env.NODE_ENV || "development",
  bcrypt_salt_rounds: +(process.env.BCRYPT_SALT_ROUNDS || 0),
  jwt_access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET || "",
  jwt_refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET || "",
};
