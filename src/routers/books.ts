import express from "express";
import { bookController } from "../controllers/book";
import { body, param } from "express-validator";
import { isAdmin, requiredUser, validator } from "../middlewares/validation";

export default function (router: express.Router) {
  router.get("/book", bookController.getAllBooks);
  router.get(
    "/book/:id",
    [param("id").notEmpty()],
    validator,
    bookController.getBookById
  );
  router.post(
    "/book",
    [
      body("title").isString().notEmpty(),
      body("genre").isString().notEmpty(),
      body("published_date").notEmpty(),
      body("author_id").isNumeric().notEmpty(),
      body("description").isString().notEmpty(),
    ],
    validator,
    isAdmin,
    bookController.addNewBook
  );
  router.put(
    "/book/:id",
    [param("id").notEmpty()],
    validator,
    isAdmin,
    bookController.updateBook
  );
  router.delete(
    "/book/:id",
    [param("id").notEmpty()],
    validator,
    isAdmin,
    bookController.deleteBook
  );
  router.post(
    "/book/borrow/:id",
    requiredUser,
    [param("id").notEmpty()],
    validator,
    bookController.borrowBook
  );
}
