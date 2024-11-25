import connectDB from "@/lib/db";
import User from "@/models/User";
import { UserType } from "@/types/models";

export async function getUserByEmail(
  email: string
): Promise<Partial<UserType> | null> {
  await connectDB();
  return await User.findOne({ email });
}

export async function getUserById(
  id: string
): Promise<Partial<UserType> | null> {
  await connectDB();
  return await User.findById(id);
}

export async function addUserToOrganization(orgId: string, userId: string) {
  await connectDB();
  // add user to org members array field
  return await User.findByIdAndUpdate(
    orgId,
    { $push: { members: userId } },
    { new: true }
  );
}

export async function addOrganizationToUser(orgId: string, userId: string) {
  await connectDB();
  // add user to org members array field
  return await User.findByIdAndUpdate(
    userId,
    { $push: { organizations: orgId } },
    { new: true }
  );
}
