import { User } from "./user";

export interface Issue {
  _id: string;
  title: string;
  description: string;
  label: string;
  status: string;
  priority: string;
  reportedBy: User;
}
