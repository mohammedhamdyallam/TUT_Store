// Next.js
import { cookies } from "next/headers";

// JWT
import jwt from "jsonwebtoken";


// Verify token for API (App Router safe)
export function verifyToken() {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      return null;
    }

    const userPayload = jwt.verify(token, process.env.JWT_SECRET);
    return userPayload;
  } catch {
    return null;
  }
}

// Verify token for client
export function verifyTokenClient(token) {
  try {
    // Get user payload
    const userPayload = jwt.verify(token, process.env.JWT_SECRET);

    // Chech user payload
    if(!userPayload) return null;

    return userPayload;
  } catch {
    return null;
  }
}
