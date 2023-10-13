import { validationResult } from "express-validator";
import { getDB } from "../lib/db";
import express from "express";
import { isEmptyObj, isPropExit } from "../lib/validation";
const db = getDB();

export const authorController = {
  getAllAuthors: async function (req: express.Request, res: express.Response) {
    if (isPropExit(req.query, "name")) {
      const search_name = req.query.name as string;
      if (search_name === "")
        return res.status(400).json({
          status: 400,
          message: `missing search term`,
        });

      try {
        const authors = await db.author.findMany({
          where: {
            name: {
              startsWith: search_name,
            },
          },
        });
        if (!authors || authors.length <= 0)
          return res
            .status(400)
            .json({
              status: 400,
              message: `no author with name ${search_name}`,
            })
            .end();

        return res
          .status(200)
          .json({
            status: 200,
            message: "retrieve authors data",
            data: authors,
          })
          .end();
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
    } else {
      try {
        const authors = await db.author.findMany();
        if (!authors || authors.length <= 0)
          return res.status(200).json({
            status: 400,
            message: "no author",
          });

        return res
          .status(200)
          .json({
            status: 200,
            message: "retrieve authors data",
            data: authors,
          })
          .end();
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
    }
  },
  getAuthorById: async function (req: express.Request, res: express.Response) {
    if (!req.params.id)
      return res.status(400).json({
        status: 400,
        message: "missing author id",
      });

    try {
      const id = parseInt(req.params.id, 10);
      const author = await db.author.findUnique({
        where: {
          id,
        },
      });

      if (!author)
        return res.status(400).json({
          status: 400,
          message: `there is no author with id ${id}`,
        });

      return res.status(200).json({
        status: 200,
        message: "author data",
        data: author,
      });
    } catch (e) {
      return res.status(500).json({
        message: "something went wrong!",
      });
    } finally {
      db.$disconnect();
    }
  },
  addNewAuthor: async function (req: express.Request, res: express.Response) {
    try {
      const { name, email, nation, quote } = req.body;
      const new_author = await db.author.create({
        data: {
          name,
          email,
          nation,
          quote,
        },
      });
      return res.status(201).json({
        status: 201,
        message: "new author is created",
        data: new_author,
      });
    } catch (e) {
      return res.status(500).json({
        message: "something went wrong!",
      });
    } finally {
      db.$disconnect();
    }
  },
  updateAuthor: async function (req: express.Request, res: express.Response) {
    try {
      if (isEmptyObj(req.body)) {
        return res.status(400).json({
          status: 400,
          message: `missing request body`,
        });
      }

      const id = parseInt(req.params.id, 10);
      const update_author = await db.author.update({
        where: { id },
        data: req.body,
      });
      return res.status(200).json({
        status: 200,
        message: `author updated with id ${id}`,
        data: update_author,
      });
    } catch (e) {
      return res.status(500).json({
        message: "something went wrong!",
      });
    } finally {
      db.$disconnect();
    }
  },
  deleteAuthor: async function (req: express.Request, res: express.Response) {
    try {
      const id = parseInt(req.params.id, 10);
      await db.author.delete({
        where: { id },
      });
      return res.status(200).json({
        status: 200,
        message: `author deleted with id ${id}`,
      });
    } catch (e) {
      return res.status(500).json({
        message: "something went wrong!",
      });
    } finally {
      db.$disconnect();
    }
  },
};
