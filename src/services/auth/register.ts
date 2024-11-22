import User from "@/models/User";
import { UserType } from "@/types/models";

export async function register(user: Partial<UserType>) {
  return await User.create(user);
}
