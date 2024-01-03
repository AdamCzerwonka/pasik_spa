export const Roles = {
  client: "Client",
  manager: "Manager",
  administator: "Administrator",
} as const;

export type Roles = (typeof Roles)[keyof typeof Roles];
