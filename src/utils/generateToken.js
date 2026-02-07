// JWT
import jwt from "jsonwebtoken";

// Cookie
import { serialize } from "cookie";

// generate jwt token
export function jenerateJWT(jwtPayload) {
  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return token;
}

// set cookie with jwt
export function setCookie(jwtPayload) {
  const token = jenerateJWT(jwtPayload);

  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return cookie;
}
