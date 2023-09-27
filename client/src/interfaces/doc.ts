export interface Doc {
  name: string;
  path: string;
  type: "f" | "d";
  children?: Doc[];
}
