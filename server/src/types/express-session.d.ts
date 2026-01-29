import "express-session";

declare module "express-session" {
  interface SessionData {
    userId?: number; // or number — match your DB
    role?: "admin" | "user";
  }
}
