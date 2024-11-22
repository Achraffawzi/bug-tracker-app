export type UserType = {
  _id: any;
  name: string;
  picture?: string;
  isOrganization?: boolean;
  isVerified?: boolean;
  email: string;
  password: string;
  organizations?: string[];
  members?: string[];
};

export enum Priority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export enum Status {
  InProgress = "in progress",
  Resolved = "resolved",
  Closed = "closed",
}

export type BugType = {
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  organizationId: string;
  attachments?: string[];
  assignees?: string[];
  dueDate?: Date;
  labels?: string[];
};
