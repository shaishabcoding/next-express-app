import jwt, { JwtPayload } from "jsonwebtoken";

export const createToken = (
  jwtPayload: JwtPayload,
  secret: string,
  expiresIn: string
) =>
  jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
