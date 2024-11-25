import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";
import { jwtDecode } from "jwt-decode";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function verifyPassword(
  inputPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(inputPassword, hashedPassword);
}

export function generateAccessToken(
  userId: string,
  isOrganization: boolean
): string {
  const secretKey = process.env.JWT_SECRET_KEY || "kjlKJKSJQLD89QSDKJ";
  const token = jwt.sign({ userId, isOrganization }, secretKey, {
    expiresIn: "1y", // Token expires in 1 hour
  });
  return token;
}

export function verifyAccessToken(token: string): any {
  if (!token) return null;

  try {
    const secretKey = process.env.JWT_SECRET_KEY || "kjlKJKSJQLD89QSDKJ";
    const decoded = jwt.verify(token, secretKey);
    console.log("deeeecodeeeeed, " + decoded);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error.message);
    return null;
  }
}

export async function verifyToken(token: string, secret: string) {
  try {
    const secretKey = new TextEncoder().encode(secret); // Convert secret to Uint8Array
    const { payload } = await jwtVerify(token, secretKey);
    return payload; // The decoded payload
  } catch (error) {
    console.error("Invalid token:", error);
    throw error;
  }
}

export function decodeJwt(token: string): any {
  return jwtDecode(token);
}
