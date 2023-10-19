import express from "express";
import { getDB } from "./db";
import { Prisma } from "@prisma/client";
const db = getDB();

export async function setIssueDateToNext7Days(basketId: number) {
  const basket = await db.borrow_Basket.findUnique({
    where: { id: basketId },
  });

  if (!basket) {
    throw new Error("Borrow_Basket not found");
  }

  // Calculate the issue_date by adding 7 days to the borrowed_date
  const next7Days = new Date(basket.borrowed_date);
  next7Days.setDate(next7Days.getDate() + 7);

  return next7Days;
}

export async function getUserBySessionToke(req: express.Request, toke: string) {
  try {
    const session = req.cookies["lib_cookie"];

    const auth_session = await db.session.findUnique({
      where: { session_token: session },
    });

    if (!auth_session || !auth_session.user_id) return false;
    const auth_user = await db.user.findUnique({
      where: {
        id: auth_session.user_id,
      },
    });

    if (!auth_user) return false;
    return auth_user;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError)
      throw new Error(e.message);

    throw new Error("something went wrong");
  } finally {
    db.$disconnect();
  }
}
