import connectDB from "@/lib/db";
import Bug from "@/models/Bug";
import { BugType } from "@/types/models";

export async function createBug(data: Partial<BugType>) {
  await connectDB();
  const bug = new Bug(data);
  await bug.save();
}

export async function updateBug(id: string, data: Partial<BugType>) {
  await connectDB();
  await Bug.findByIdAndUpdate(id, data, { new: true });
}

export async function getBugsWithPagination(
  organizationId: string,
  page: number,
  pageSize: number
) {
  const skip = (page - 1) * pageSize;

  // Assuming a MongoDB-like query
  const bugs = await Bug.find({ organizationId })
    .skip(skip)
    .limit(pageSize)
    .exec();

  const total = await Bug.countDocuments({ organizationId }).exec();

  return { bugs, total };
}
