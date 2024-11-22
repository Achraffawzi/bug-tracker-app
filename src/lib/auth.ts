import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export function generateAccessToken(userId: string): string {
  const secretKey = process.env.JWT_SECRET_KEY || "SKLDFHI76786SDFY"; // Use an environment variable for the secret key
  const token = jwt.sign({ userId }, secretKey, {
    expiresIn: "1y", // Token expires in 1 hour
  });
  return token;
}

export function verifyAccessToken(token: string | undefined): any {
  try {
    const secretKey = process.env.JWT_SECRET_KEY || "SKLDFHI76786SDFY";
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
