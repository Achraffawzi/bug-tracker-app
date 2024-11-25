import connectDB from "@/lib/db";
import Bug from "@/models/Bug";
import { BugType } from "@/types/models";

export async function createBug(data: Partial<BugType>) {
  await connectDB();
  const bug = new Bug(data);
  await bug.save();
}
