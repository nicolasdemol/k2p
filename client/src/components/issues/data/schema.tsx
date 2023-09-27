import { z } from "zod";

export const userSchema = z.object({
  _id: z.string(),
  username: z.string(),
  password: z.string(),
  firstname: z.string(),
  surname: z.string(),
  role: z.string(),
  created_at: z.string(),
});

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const issueSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  label: z.string(),
  status: z.string(),
  priority: z.string(),
  reportedBy: userSchema,
});

export type Issues = z.infer<typeof issueSchema>;
