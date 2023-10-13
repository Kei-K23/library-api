import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

export function getDB() {
  if (!db) {
    db = new PrismaClient();
  }
  return db;
}
