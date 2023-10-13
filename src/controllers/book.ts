import express from "express";
import { getDB } from "../lib/db";
import { isEmptyObj, isPropExit } from "../lib/validation";

const db = getDB();

export const bookController = {
  getAllBooks: async function (req: express.Request, res: express.Response) {
    if (isPropExit(req.query, "title")) {
      const search_title = req.query.title as string;
      if (search_title === "")
        return res.status(400).json({
          status: 400,
          message: `missing search term`,
        });
      try {
        const books = await db.book.findMany({
          where: {
            title: {
              startsWith: search_title,
            },
          },
        });
        if (!books || books.length <= 0)
          return res
            .status(400)
            .json({
              status: 400,
              message: `no book with name ${search_title}`,
            })
            .end();

        return res
          .status(200)
          .json({
            status: 200,
            message: "retrieve books data",
            data: books,
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
        const books = await db.book.findMany();
        if (!books)
          return res.status(200).json({
            status: 200,
            message: "no book",
          });

        return res.status(200).json({
          status: 200,
          message: "retrieve books data",
          data: books,
        });
      } catch (e) {
        return res.status(500).json({
          message: "something went wrong!",
        });
      } finally {
        db.$disconnect();
      }
    }
  },
  getBookById: async function (req: express.Request, res: express.Response) {
    if (!req.params.id)
      return res.status(400).json({
        status: 400,
        message: "missing book id",
      });

    try {
      const id = parseInt(req.params.id, 10);
      const book = await db.book.findUnique({
        where: {
          id,
        },
      });

      if (!book)
        return res.status(400).json({
          status: 400,
          message: `there is no book with id ${id}`,
        });

      return res.status(200).json({
        status: 200,
        message: "book data",
        data: book,
      });
    } catch (e) {
      return res.status(500).json({
        message: "something went wrong!",
      });
    } finally {
      db.$disconnect();
    }
  },
  addNewBook: async function (req: express.Request, res: express.Response) {
    try {
      const { title, genre, published_date, author_id, description } = req.body;
      const new_book = await db.book.create({
        data: {
          title,
          genre,
          published_date: new Date(published_date),
          author_id,
          description,
        },
      });
      return res.status(201).json({
        status: 201,
        message: "new book is created",
        data: new_book,
      });
    } catch (e) {
      return res.status(500).json({
        message: "something went wrong!",
      });
    } finally {
      db.$disconnect();
    }
  },
  updateBook: async function (req: express.Request, res: express.Response) {
    try {
      if (isEmptyObj(req.body)) {
        return res.status(400).json({
          status: 400,
          message: `missing request body`,
        });
      }

      const id = parseInt(req.params.id, 10);
      const update_book = await db.book.update({
        where: { id },
        data: req.body,
      });
      return res.status(200).json({
        status: 200,
        message: `book updated with id ${id}`,
        data: update_book,
      });
    } catch (e) {
      return res.status(500).json({
        message: "something went wrong!",
      });
    } finally {
      db.$disconnect();
    }
  },
  deleteBook: async function (req: express.Request, res: express.Response) {
    try {
      const id = parseInt(req.params.id, 10);
      await db.book.delete({
        where: { id },
      });
      return res.status(200).json({
        status: 200,
        message: `book deleted with id ${id}`,
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
