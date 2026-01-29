import type { Request, Response, NextFunction } from "express";

export const requireRole = (...allowedRoles: Array<"admin" | "user">) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.role) {
      return res.status(400).json({ error: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.session.role)) {
      return res.status(403).json({ error: "Forbidden: Insufficient role" });
    }

    next();
  };
};
