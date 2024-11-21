import User from "@/models/User";
import { UserType } from "@/types/models";

export function register(user: UserType) {
  return User.create(user);
}
