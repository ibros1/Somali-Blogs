import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/request";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const authorize = (roles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = await prisma.users.findFirst({
      where: {
        id: req.userId,
      },
    });

    if (!user) {
      res.status(401).json({
        isSuccess: false,
        message: "Unauthorized",
      });
      return;
    }

    if (roles.includes(user.role)) {
      next();
      return;
    }
    res.status(401).json({
      isSuccess: false,
      message: "Access denied. you are not admin!!!",
    });
  };
};
