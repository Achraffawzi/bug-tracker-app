import connectDB from "@/lib/db";
import User from "@/models/User";
import { UserType } from "@/types/models";

export async function getUserByEmail(
  email: string
): Promise<Partial<UserType> | null> {
  await connectDB();
  return await User.findOne({ email });
}
