import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body as {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
  };

  try {
    // Hash the password before storing it
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        updatedAt: new Date(),
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body as {
    email: string;
    password: string;
  };
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credential" });
    }

    // You can set up session here if needed
    req.session.userId = user.id;
    req.session.role = user.role;
    console.log("login session:", req.session);

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const getDashboard = async (req: Request, res: Response) => {
  // console.log("dashboard session:", req.session);
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
      select: {
        name: true,
        role: true,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "Dashboard data", user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
      select: {
        name: true,
        role: true,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "Dashboard data", user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
