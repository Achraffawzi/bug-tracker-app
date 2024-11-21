export type User = {
  name: string;
  picture?: string;
  isOrganization?: boolean;
  isVerified?: boolean;
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

export type Bug = {
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