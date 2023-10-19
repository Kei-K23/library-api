import { getDB } from "../lib/db";
import express from "express";
import { isEmptyObj } from "../lib/validation";
import { authentication, expireDate, randomHash } from "../lib/auth";
import { Prisma } from "@prisma/client";
import { getUserBySessionToke } from "../lib/utils";
const db = getDB();

type UserType = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role_id?: number;
  suspended?: number;
  created_at?: Date;
  updated_at?: Date;
  salt?: string;
};

interface MyUserRequestBody extends express.Request {
  body: UserType;
}

export const userController = {
  getAllUser: async function (req: express.Request, res: express.Response) {
    try {
      const users = await db.user.findMany();

      if (isEmptyObj(users))
        return res.status(400).json({
          message: "there is no users",
        });

      return res.status(200).json({
        message: "retrieve users data",
        data: users,
      });
    } catch (e) {
      return res
        .status(500)
        .json({
          message: "something went wrong!",
        })
        .end();
    } finally {
      db.$disconnect();
    }
  },
  registerUser: async function (req: MyUserRequestBody, res: express.Response) {
    try {
      const { name, email, password, role_id } = req.body;

      const existing_user = await db.user.findFirst({ where: { email } });
      if (existing_user)
        res.status(400).json({
          message: "user already register",
          links: {
            login: "http://localhost:8008/user/login",
          },
        });

      const salt = randomHash();

      const register_user = await db.user.create({
        data: {
          name,
          email,
          password: authentication(salt, password),
          salt,
          role_id,
        },
      });
      return res.status(201).json({
        message: "successfully register",
        data: register_user,
        links: {
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
  },
  loginUser: async function (req: express.Request, res: express.Response) {
    try {
      const { email, password } = req.body;

      const user = await db.user.findUnique({ where: { email } });
      if (!user)
        return res.status(400).json({
          message: "user is not register yet",
          links: {
            register: "http://localhost:8008/user/register",
          },
        });

      const auth_hash_pass = authentication(user.salt as string, password);

      if (auth_hash_pass !== user.password)
        return res.status(403).json({
          message: "unauthorized user",
          links: {
            register: "http://localhost:8008/user/register",
          },
        });

      const salt_for_sessionToke = randomHash();
      const session = await db.session.create({
        data: {
          user_id: user.id,
          session_token: authentication(salt_for_sessionToke, user.password),
        },
      });
      res.locals.user = user;

      res.cookie("lib_cookie", session.session_token, {
        domain: "localhost",
        path: "/",
        expires: expireDate(1),
      });

      return res.status(200).json({
        message: "user authentication successful",
        data: user,
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
          message: `something went wrong! ${e}`,
        })
        .end();
    } finally {
      db.$disconnect();
    }
  },

  logoutUser: async function (req: express.Request, res: express.Response) {
    const session = req.cookies["lib_cookie"];
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
      res.clearCookie("lib_cookie", {
        domain: "localhost",
        path: "/",
      });
      return res.status(200).json({
        message: "user successfully logout",
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
  },
  updateUser: async function (req: express.Request, res: express.Response) {
    const id = parseInt(req.params.id, 10);

    if (!id)
      return res.status(400).json({
        message: "missing request fields",
      });
    if (isEmptyObj(req.body))
      return res.status(400).json({
        message: "missing request fields",
      });

    try {
      const update_user = await db.user.update({
        where: { id },
        data: req.body,
      });
      return res.status(200).json({
        message: "user updated",
        data: update_user,
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
  },
  deleteUser: async function (req: express.Request, res: express.Response) {
    const id = parseInt(req.params.id, 10);
    const session = req.cookies["lib_cookie"];

    if (!id)
      return res.status(400).json({
        message: "missing request fields",
      });

    try {
      await db.user.delete({ where: { id } });
      if (session)
        res.clearCookie("lib_cookie", {
          domain: "localhost",
          path: "/",
        });
      return res.status(200).json({
        message: "user successfully deleted",
        links: {
          login: "http://localhost:8008/user/login",
          register: "http://localhost:8008/user/register",
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
  },
  getAllBorrowBooksForAuthUser: async function (
    req: express.Request,
    res: express.Response
  ) {
    const session = req.cookies["lib_cookie"];
    const id = parseInt(req.params.id, 10);

    if (!id)
      return res.status(400).json({
        message: "missing request field",
      });

    if (!session)
      return res.status(403).json({
        message: "forbidden to retrieve borrow data for this user",
      });

    const user = await getUserBySessionToke(req, session);

    if (!user || id !== user.id)
      return res.status(403).json({
        message: "forbidden to retrieve borrow data for this user",
      });

    try {
      const borrow_basket = await db.borrow_Basket.findMany({
        where: { user_id: user.id, is_returned: false },
      });
      if (isEmptyObj(borrow_basket))
        return res.status(200).json({
          message: `there is no book inside borrow basket for this user with id ${user.id}`,
        });
      return res.status(200).json({
        message: `retrieve borrowed books inside borrow basket for this user with id ${user.id}`,
        data: borrow_basket,
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
  },
};
