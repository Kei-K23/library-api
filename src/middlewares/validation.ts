import express, { NextFunction } from "express";
import { validationResult } from "express-validator";
import { getDB } from "../lib/db";
import { Prisma } from "@prisma/client";
const db = getDB();
export function validator(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const error = validationResult(req);

  if (!error.isEmpty())
    return res.status(400).json({
      message: "missing request fields",
      error: error.array(),
    });
  next();
}

export async function isAdmin(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  const session = req.cookies["lib_cookie"];
  try {
    const auth_session = await db.session.findUnique({
      where: {
        session_token: session,
      },
    });
    if (!auth_session)
      return res.status(400).json({
        message: "user is not login",
        links: {
          login: "http://localhost:8008/user/login",
        },
      });

    const auth_user = await db.user.findUnique({
      where: {
        id: auth_session.user_id,
      },
    });

    if (!auth_user)
      return res.status(401).json({
        message: "unauthorized",
      });

    if (auth_user.role_id !== 2)
      return res.status(403).json({
        message: "forbidden! you have no authorization",
      });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError)
      return res
        .status(500)
        .json({
          message: e.message,
        })
        .end();

    return res
      .status(500)
      .json({
        message: "something went wrong!",
        error: e,
      })
      .end();
  } finally {
    db.$disconnect();
  }

  next();
}

export async function isSessionTokenExist(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const session = req.cookies["lib_cookie"];

  if (!session) return next();

  try {
    const auth_session = await db.session.findUnique({
      where: {
        session_token: session,
      },
    });
    if (auth_session)
      return res.status(400).json({
        message:
          "you are still login! Please first logout to make another login",
      });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError)
      return res
        .status(500)
        .json({
          message: e.message,
        })
        .end();

    return res
      .status(500)
      .json({
        message: "something went wrong!",
        error: e,
      })
      .end();
  } finally {
    db.$disconnect();
  }

  next();
}

export async function isSuspended(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const { email, password } = req.body;
  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user)
      return res.status(400).json({
        message: "user is not register yet",
        links: {
          register: "http://localhost:8008/user/register",
        },
      });
    if (user.suspended === 1)
      return res.status(403).json({
        message: "user is under suspended",
        links: {
          register: "http://localhost:8008/user/register",
          login: "http://localhost:8008/user/login",
        },
      });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError)
      return res
        .status(500)
        .json({
          message: e.message,
        })
        .end();

    return res
      .status(500)
      .json({
        message: "something went wrong!",
      })
      .end();
  } finally {
    db.$disconnect();
  }

  next();
}

export async function isOwnerOrAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const session = req.cookies["lib_cookie"];
  const id = parseInt(req.params.id, 10);
  if (!session)
    return res.status(400).json({
      message: "user is not login",
      links: {
        login: "http://localhost:8008/user/login",
      },
    });

  try {
    const auth_session = await db.session.findUnique({
      where: { session_token: session },
    });
    if (!auth_session)
      return res.status(400).json({
        message: "user is not login",
        links: {
          login: "http://localhost:8008/user/login",
        },
      });

    const auth_user = await db.user.findUnique({
      where: {
        id: auth_session.user_id,
      },
    });

    if (!auth_user)
      return res.status(403).json({
        message: "forbidden! you are not authorized person",
      });

    if (auth_user.role_id === 2) return next();

    if (auth_user.id !== id)
      return res.status(403).json({
        message: "forbidden! you are not authorized person",
      });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError)
      return res
        .status(500)
        .json({
          message: e.message,
        })
        .end();

    return res
      .status(500)
      .json({
        message: "something went wrong!",
      })
      .end();
  } finally {
    db.$disconnect();
  }

  next();
}

export async function requiredUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const session = req.cookies["lib_cookie"];

    if (!session) return next();
    next();
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError)
      return res
        .status(500)
        .json({
          message: e.message,
        })
        .end();
    return res
      .status(500)
      .json({
        message: "something went wrong!",
      })
      .end();
  }
}
