import "dotenv/config";
import express from "express";
import expressSession from "express-session";
import cors from "cors";

import userRoute from "./routes/userRoute";
import { prisma } from "./lib/prisma";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  }),
);

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      // dbRecordIdFunction: undefined,
    }),
  }),
);

// Routes setup
app.use("/api", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
