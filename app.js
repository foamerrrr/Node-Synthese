import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "./generated/prisma/client.ts";
import {PrismaMariaDb} from "@prisma/adapter-mariadb";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";

dotenv.config();

const app = express();

const adapter = new PrismaMariaDb({
  host: "localhost",
  user: "root",
  database: "snack",
});

export const prisma = new PrismaClient({ adapter });

app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

export default app;